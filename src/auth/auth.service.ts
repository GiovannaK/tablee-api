import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { SigninInput } from './signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async verifyTokenExpiration(expirationLoginToken: string) {
    const expirationLoginTokenToNumber = Number(expirationLoginToken);
    const now = Date.now();
    if (now > expirationLoginTokenToNumber) {
      throw new BadRequestException('Token expired');
    }
    return;
  }

  async signin(signinInput: SigninInput) {
    const user = await this.userService.getUserByEmail(signinInput.email);
    const loginToken = this.userService.generateLoginToken();
    const expirationLoginToken = String(
      this.userService.generateLoginTokenExpiration(),
    );

    await this.userRepository.update(user, {
      loginToken,
      expirationLoginToken,
    });

    const updatedUser = await this.userRepository.create({
      ...user,
      loginToken,
      expirationLoginToken,
    });

    await this.userRepository.save(updatedUser);

    const subject = 'Tablee: Faça login para continuar';
    const text = `clique no link para fazer login: \n
      ${process.env.CLIENT_URL}/auth/${updatedUser.loginToken}
    `;

    await this.emailService.sendMail(user.email, subject, text);
    console.log(updatedUser);
    return updatedUser;
  }

  async validateUser(authToken: string) {
    const user = await this.userRepository.findOne({
      where: { loginToken: authToken },
    });

    if (!user) {
      throw new NotFoundException('Cannot found user');
    }

    await this.verifyTokenExpiration(user.expirationLoginToken);

    await this.userRepository.update(user, {
      loginToken: null,
      expirationLoginToken: null,
    });

    const updatedUser = await this.userRepository.create({
      ...user,
      loginToken: null,
      expirationLoginToken: null,
    });

    await this.userRepository.save(updatedUser);

    const token = await this.jwtToken(user);

    return {
      updatedUser,
      token,
    };
  }

  private async jwtToken(user: User) {
    const payload = { role: user.role, sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
  }
}
