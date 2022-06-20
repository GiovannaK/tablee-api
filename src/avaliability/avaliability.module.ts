import { Module } from '@nestjs/common';
import { AvaliabilityService } from './avaliability.service';
import { AvaliabilityResolver } from './avaliability.resolver';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { BookingModule } from '../booking/booking.module';
import { TableModule } from '../table/table.module';

@Module({
  providers: [AvaliabilityService, AvaliabilityResolver],
  imports: [RestaurantModule, BookingModule, TableModule],
})
export class AvaliabilityModule {}
