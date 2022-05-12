import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class UsersRestaurant {
  @Field(() => [User])
  users: User[];

  @Field()
  count: number;
}
