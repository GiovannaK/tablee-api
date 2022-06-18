import { Field, ObjectType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';

@ObjectType()
export class RestaurantsAndCount {
  @Field(() => [Restaurant])
  restaurants: Restaurant[];

  @Field()
  count: number;
}
