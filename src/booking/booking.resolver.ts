/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
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
import { BookingStatusPortuguese } from './entities/enums/bookingStatus.enum';
import { BookingOngoingInput } from './dto/booking-ongoing.input';

const BOOKING_ADDED_EVENT = 'bookingAdded';
const BOOKING_APPROVED_EVENT = 'bookingApproved';
const BOOKING_REJECT_EVENT = 'bookingReject';

@Resolver()
export class BookingResolver {
  constructor(
    private readonly bookingService: BookingService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  @Subscription(() => BookingUserRestaurant, {
    filter: (payload, variables) => {
      return payload.bookingAdded.restaurant.id === variables.restaurantId;
    },
  })
  bookingAdded(@Args('restaurantId') restaurantId: string) {
    return this.pubSub.asyncIterator(BOOKING_ADDED_EVENT);
  }

  @Subscription(() => BookingUserRestaurant, {
    filter: (payload, variables) => {
      return payload.bookingApproved.restaurant.id === variables.restaurantId;
    },
  })
  bookingApproved(@Args('restaurantId') restaurantId: string) {
    return this.pubSub.asyncIterator(BOOKING_APPROVED_EVENT);
  }

  @Subscription(() => BookingUserRestaurant, {
    filter: (payload, variables) => {
      return payload.bookingReject.restaurant.id === variables.restaurantId;
    },
  })
  bookingReject(@Args('restaurantId') restaurantId: string) {
    return this.pubSub.asyncIterator(BOOKING_REJECT_EVENT);
  }

  @Mutation(() => BookingUserRestaurant)
  @Roles(UserRole.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createBooking(
    @Args('data') data: CreateBookingInput,
    @CurrentUser() currentUser: User,
  ) {
    const createdByWaitList = false;
    const booking = await this.bookingService.createBooking(
      data,
      currentUser,
      createdByWaitList,
    );
    this.pubSub.publish(BOOKING_ADDED_EVENT, { bookingAdded: booking });
    return booking;
  }

  @Mutation(() => BookingUserRestaurant)
  @Roles(UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async approveBooking(
    @Args('restaurantId') restaurantId: string,
    @Args('bookingId') bookingId: string,
    @CurrentUser() currentUser: User,
  ) {
    const booking = await this.bookingService.approveBooking(
      currentUser,
      restaurantId,
      bookingId,
    );
    this.pubSub.publish(BOOKING_APPROVED_EVENT, { bookingApproved: booking });
    return booking;
  }

  @Mutation(() => BookingUserRestaurant)
  @Roles(UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async rejectBooking(
    @Args('restaurantId') restaurantId: string,
    @Args('bookingId') bookingId: string,
    @CurrentUser() currentUser: User,
  ) {
    const booking = await this.bookingService.rejectBooking(
      currentUser,
      restaurantId,
      bookingId,
    );
    this.pubSub.publish(BOOKING_REJECT_EVENT, { bookingReject: booking });
    return booking;
  }

  @Roles(UserRole.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => [Booking])
  async getCurrentUserBookings(@CurrentUser() currentUser: User) {
    const booking = await this.bookingService.getCurrentUserBookings(
      currentUser,
    );
    return booking;
  }

  @Roles(UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => [Booking])
  async getRestaurantBookings(
    @Args('restaurantId') restaurantId: string,
    @CurrentUser() currentUser: User,
  ) {
    const booking = await this.bookingService.getRestaurantBookings(
      currentUser,
      restaurantId,
    );
    return booking;
  }

  @Roles(UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => [Booking])
  async getRestaurantBookingsByStatus(
    @Args('restaurantId') restaurantId: string,
    @Args('status') status: BookingStatusPortuguese,
    @CurrentUser() currentUser: User,
  ) {
    const bookings = await this.bookingService.getBookingByStatusForRestaurant(
      status,
      restaurantId,
      currentUser,
    );
    return bookings;
  }

  @Roles(UserRole.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => [Booking])
  async getRestaurantBookingsByUser(@CurrentUser() currentUser: User) {
    const bookings = await this.bookingService.getBookingsByUser(currentUser);
    return bookings;
  }

  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Booking)
  async bookingOnGoing(
    @Args('data') data: BookingOngoingInput,
    @CurrentUser() currentUser: User,
  ) {
    const booking = await this.bookingService.onGoingBooking(currentUser, data);
    return booking;
  }
}
