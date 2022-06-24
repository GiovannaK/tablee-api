import { Module } from '@nestjs/common';
import { WaitlistService } from './waitlist.service';
import { WaitlistResolver } from './waitlist.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaitList } from './entities/waitList.entity';
import { BookingModule } from '../booking/booking.module';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { PermissionModule } from '../permission/permission.module';

@Module({
  providers: [WaitlistService, WaitlistResolver],
  imports: [
    TypeOrmModule.forFeature([WaitList]),
    BookingModule,
    RestaurantModule,
    PermissionModule,
  ],
  exports: [WaitlistService],
})
export class WaitlistModule {}
