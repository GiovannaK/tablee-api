import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';

@Module({
  providers: [RestaurantService, RestaurantResolver],
})
export class RestaurantModule {}
