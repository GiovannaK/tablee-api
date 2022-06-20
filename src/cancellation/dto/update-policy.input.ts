import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdatePolicyInput {
  @Field()
  @IsUUID()
  restaurantId: string;

  @Field()
  @IsUUID()
  id: string;

  @IsOptional()
  @Field()
  @IsNumber()
  tax?: number;

  @IsOptional()
  @Field()
  @IsString()
  details?: string;

  @IsOptional()
  @Field()
  @IsInt()
  limitDaysToCancel?: number;
}
