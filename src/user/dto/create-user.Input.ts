import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @Length(1, 200)
  firstName: string;

  @Field()
  @IsString()
  @Length(1, 200)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(10, 11)
  mainPhone: string;

  @Field()
  @Length(10, 11)
  secondaryPhone: string;
}
