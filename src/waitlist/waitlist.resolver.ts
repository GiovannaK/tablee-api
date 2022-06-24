import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { WaitlistService } from './waitlist.service';
import { Roles } from '../auth/userRoles.decorator';
import { UserRole } from '../user/entities/role/userRole';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { CurrentUser } from '../user/decorators/currentUser.decorator';
import { WaitList } from './entities/waitList.entity';
import { User } from '../user/entities/user.entity';
import { CreateBookingInput } from '../booking/dto/create-booking.input';
import { BookingUserRestaurant } from '../booking/dto/booking-user-restaurant.input';
import { WaitListOutput } from './dto/waitList.output';

const WAITLIST_ADDED_EVENT = 'waitListAdded';
@Resolver()
export class WaitlistResolver {
  constructor(
    private readonly waitListService: WaitlistService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  @Subscription(() => BookingUserRestaurant, {
    filter: (payload, variables) => {
      return payload.waitListAdded.restaurant.id === variables.restaurantId;
    },
  })
  waitListAdded(@Args('restaurantId') restaurantId: string) {
    return this.pubSub.asyncIterator(WAITLIST_ADDED_EVENT);
  }

  @Roles(UserRole.MANAGER, UserRole.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Boolean)
  async createWaitListForRestaurant(
    @Args('restaurantId') restaurantId: string,
    @CurrentUser() currentUser: User,
  ) {
    const waitList = await this.waitListService.createWaitList(
      currentUser,
      restaurantId,
    );
    return waitList;
  }

  @Mutation(() => BookingUserRestaurant)
  @Roles(UserRole.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createBookingByWaitList(
    @Args('bookingInput') bookingInput: CreateBookingInput,
    @CurrentUser() currentUser: User,
  ) {
    const createdByWaitList = true;
    const booking = await this.waitListService.createBookingByWaitList(
      bookingInput,
      currentUser,
      createdByWaitList,
    );
    this.pubSub.publish(WAITLIST_ADDED_EVENT, { waitListAdded: booking });
    return booking;
  }

  @Roles(UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => WaitList)
  async getWaitListWithBookings(
    @Args('restaurantId') restaurantId: string,
    @CurrentUser() currentUser: User,
  ) {
    const waitList = await this.waitListService.getWaitListWithBookings(
      currentUser,
      restaurantId,
    );
    return waitList;
  }
}
