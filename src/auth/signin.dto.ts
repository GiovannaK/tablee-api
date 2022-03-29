import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class SigninInput {
  @Field()
  @IsEmail()
  email: string;
}
