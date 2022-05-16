import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsUUID, Length } from 'class-validator';

@InputType()
export class CreateMenuInput {
  @Field()
  @IsString()
  @Length(1, 200)
  title: string;

  @Field()
  @IsUUID()
  restaurantId: string;
}
