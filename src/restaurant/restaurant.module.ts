import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { UserModule } from '../user/user.module';
import { StripeModule } from '../stripe/stripe.module';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant]), UserModule, StripeModule],
  providers: [RestaurantService, RestaurantResolver],
})
export class RestaurantModule {}
