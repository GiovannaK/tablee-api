import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID, Length } from 'class-validator';

@InputType()
export class UpdateMenuInput {
  @IsOptional()
  @Field()
  @IsString()
  @IsUUID()
  id: string;

  @IsOptional()
  @Field()
  @IsString()
  @Length(1, 200)
  title?: string;

  @Field()
  @IsUUID()
  restaurantId: string;
}
