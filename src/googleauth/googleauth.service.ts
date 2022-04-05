import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth, google } from 'googleapis';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class GoogleauthService {
  oauthClient: Auth.OAuth2Client;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_SECRET_KEY;

    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  async authenticate(token: string) {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);
    this.oauthClient.setCredentials({ access_token: token });
    const email = tokenInfo.email;
    const OAuth2 = google.oauth2({
      auth: this.oauthClient,
      version: 'v2',
    });

    const { data } = await OAuth2.userinfo.get();

    if (!data) {
      throw new InternalServerErrorException(
        'Cannot get user info from google auth',
      );
    }

    try {
      const user = await this.userService.getUserByEmail(email);

      return this.handleRegisteredUser(user);
    } catch (error) {
      if (error.status !== 404) {
        throw new error();
      }

      return this.registerUser(token, data);
    }
  }

  async handleRegisteredUser(user: User) {
    if (!user.isRegisteredWithGoogle) {
      throw new UnauthorizedException(
        'User not registered with google account',
      );
    }

    const token = await this.authService.jwtToken(user);

    if (!token) {
      throw new InternalServerErrorException('Cannot generate JWT');
    }
    return {
      token,
      user,
    };
  }

  async registerUser(token: string, data: any) {
    const registerUserWithGoogle = await this.userRepository.create({
      firstName: data.given_name,
      lastName: data.family_name,
      email: data.email,
      isRegisteredWithGoogle: true,
    });

    const registeredUser = await this.userRepository.save(
      registerUserWithGoogle,
    );

    if (!registeredUser) {
      throw new InternalServerErrorException(
        'Cannot create user with google account',
      );
    }

    const jwtToken = await this.authService.jwtToken(registeredUser);

    if (!token) {
      throw new InternalServerErrorException('Cannot generate JWT');
    }

    return {
      user: registeredUser,
      token: jwtToken,
    };
  }
}
