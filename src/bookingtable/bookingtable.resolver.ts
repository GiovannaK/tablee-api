import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/userRoles.decorator';
import { CurrentUser } from '../user/decorators/currentUser.decorator';
import { UserRole } from '../user/entities/role/userRole';
import { UseGuards } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { Booking } from '../booking/entities/booking.entity';
import { BookingtableService } from './bookingtable.service';

@Resolver()
export class BookingtableResolver {
  constructor(private readonly bookingTableService: BookingtableService) {}

  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Booking)
  async finishBooking(
    @Args('bookingId') bookingId: string,
    @Args('restaurantId') restaurantId: string,
    @CurrentUser() currentUser: User,
  ) {
    const booking = await this.bookingTableService.finishBooking(
      bookingId,
      currentUser,
      restaurantId,
    );
    return booking;
  }
}
