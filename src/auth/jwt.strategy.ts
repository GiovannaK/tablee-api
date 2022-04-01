import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      // jwtFromRequest: (ctx: ExecutionContext) => {
      //   console.log('CONTEXT', ctx);
      //   const context = GqlExecutionContext.create(ctx);
      //   const req = context.getContext().req;
      //   console.log('cooki', req.cookies);
      //   return req.cookies['access_token'];
      // },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: {
    sub: User['id'];
    role: User['role'];
    email: string;
  }): Promise<any> {
    const user = await this.userService.getUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
