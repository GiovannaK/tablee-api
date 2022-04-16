import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { UserModule } from '../user/user.module';
import { StripeModule } from '../stripe/stripe.module';
import { RestaurantImage } from '../images/entities/restaurantImage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant, RestaurantImage]),
    UserModule,
    StripeModule,
  ],
  providers: [RestaurantService, RestaurantResolver],
  exports: [RestaurantService],
})
export class RestaurantModule {}
