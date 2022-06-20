import { Module } from '@nestjs/common';
import { CancellationService } from './cancellation.service';
import { CancellationResolver } from './cancellation.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CancellationPolicy } from './entities/cancellation.entity';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { PermissionModule } from '../permission/permission.module';

@Module({
  providers: [CancellationService, CancellationResolver],
  imports: [
    TypeOrmModule.forFeature([CancellationPolicy]),
    RestaurantModule,
    PermissionModule,
  ],
})
export class CancellationModule {}
