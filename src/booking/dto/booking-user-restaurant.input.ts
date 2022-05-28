import { Field, ObjectType } from '@nestjs/graphql';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { User } from '../../user/entities/user.entity';
import { Booking } from '../entities/booking.entity';

@ObjectType()
export class BookingUserRestaurant {
  @Field(() => User)
  user: User;

  @Field(() => Restaurant)
  restaurant: Restaurant;

  @Field(() => Booking)
  booking: Booking;
}
