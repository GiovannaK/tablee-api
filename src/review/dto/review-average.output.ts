import { Field, ObjectType } from '@nestjs/graphql';
import { Review } from '../entities/review.entity';

@ObjectType()
export class ReviewsAverage {
  @Field(() => [Review])
  reviews: Review[];

  @Field()
  average: number;
}
