import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthType } from './auth.type';
import { SigninInput } from './signin.dto';
import { ValidateUserInput } from './validate-user.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthType)
  public async validateUser(
    @Context() context: Request & Response,
    @Args('data') data: ValidateUserInput,
  ): Promise<AuthType> {
    const getToken = await this.authService.validateUser(data.loginToken);
    return {
      user: getToken.updatedUser,
      loginToken: getToken.token,
    };
  }

  @Mutation(() => User)
  public async signin(@Args('data') data: SigninInput) {
    return await this.authService.signin(data);
  }
}
