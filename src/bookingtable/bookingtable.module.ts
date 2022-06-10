import { Module } from '@nestjs/common';
import { BookingtableService } from './bookingtable.service';
import { BookingtableResolver } from './bookingtable.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from '../table/entities/table.entity';
import { Booking } from '../booking/entities/booking.entity';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { PermissionModule } from '../permission/permission.module';
import { TableModule } from '../table/table.module';
import { BookingModule } from '../booking/booking.module';

@Module({
  providers: [BookingtableService, BookingtableResolver],
  exports: [BookingtableService],
  imports: [
    TypeOrmModule.forFeature([Table, Booking]),
    RestaurantModule,
    PermissionModule,
    TableModule,
    BookingModule,
  ],
})
export class BookingtableModule {}
