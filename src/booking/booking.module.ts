import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { User } from '../user/entities/user.entity';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { PermissionModule } from '../permission/permission.module';

@Module({
  providers: [BookingService, BookingResolver],
  exports: [BookingService],
  imports: [
    TypeOrmModule.forFeature([Booking, User]),
    RestaurantModule,
    PermissionModule,
  ],
})
export class BookingModule {}
