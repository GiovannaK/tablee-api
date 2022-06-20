import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNumber, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreatePolicyInput {
  @Field()
  @IsUUID()
  restaurantId: string;

  @Field()
  @IsNumber()
  tax: number;

  @Field()
  @IsString()
  details: string;

  @Field()
  @IsInt()
  limitDaysToCancel: number;
}
