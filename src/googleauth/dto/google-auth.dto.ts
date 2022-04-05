import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class GoogleAuthInput {
  @Field()
  @IsNotEmpty()
  token: string;
}
