import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsString, IsUUID, Length, Max, Min } from 'class-validator';

@InputType()
export class CreateReviewInput {
  @Field()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @Field()
  @IsString()
  @Length(1, 2000)
  comment: string;

  @Field()
  @IsUUID()
  bookingId: string;
}
