import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { BookingService } from './booking.service';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Roles } from '../auth/userRoles.decorator';
import { UserRole } from '../user/entities/role/userRole';
import { Booking } from './entities/booking.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { CurrentUser } from '../user/decorators/currentUser.decorator';
import { CreateBookingInput } from './dto/create-booking.input';
import { User } from '../user/entities/user.entity';
import { BookingUserRestaurant } from './dto/booking-user-restaurant.input';

const BOOKING_ADDED_EVENT = 'bookingAdded';

@Resolver()
export class BookingResolver {
  constructor(
    private readonly bookingService: BookingService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  @Subscription(() => BookingUserRestaurant)
  bookingAdded() {
    return this.pubSub.asyncIterator(BOOKING_ADDED_EVENT);
  }

  @Mutation(() => BookingUserRestaurant)
  @Roles(UserRole.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createBooking(
    @Args('data') data: CreateBookingInput,
    @CurrentUser() currentUser: User,
  ) {
    const booking = await this.bookingService.createBooking(data, currentUser);
    this.pubSub.publish(BOOKING_ADDED_EVENT, { bookingAdded: booking });
    return booking;
  }
}
