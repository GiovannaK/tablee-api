import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthType } from 'src/auth/auth.type';
import { GoogleAuthInput } from './dto/google-auth.dto';
import { GoogleauthService } from './googleauth.service';

@Resolver('Google')
export class GoogleauthResolver {
  constructor(private readonly googleAuthService: GoogleauthService) {}

  @Mutation(() => AuthType)
  async signinWithGoogle(
    @Args('data') data: GoogleAuthInput,
  ): Promise<AuthType> {
    const getToken = await this.googleAuthService.authenticate(data.token);
    return {
      user: getToken.user,
      loginToken: getToken.token,
    };
  }
}
