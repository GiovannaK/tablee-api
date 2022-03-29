import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../user/entities/user.entity';

@ObjectType()
export class AuthType {
  @Field(() => User)
  user: User;

  @Field()
  loginToken: string;
}
