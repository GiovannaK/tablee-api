import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class UsersRestaurant {
  @Field(() => [User])
  users: User[];

  @Field()
  count: number;
}
