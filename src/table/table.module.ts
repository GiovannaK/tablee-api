import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableResolver } from './table.resolver';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { PermissionModule } from '../permission/permission.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from './entities/table.entity';
import { BookingModule } from '../booking/booking.module';

@Module({
  providers: [TableService, TableResolver],
  exports: [TableService],
  imports: [
    RestaurantModule,
    PermissionModule,
    BookingModule,
    TypeOrmModule.forFeature([Table]),
  ],
})
export class TableModule {}
