import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { UserModule } from '../user/user.module';
import { StripeModule } from '../stripe/stripe.module';
import { RestaurantImage } from '../images/entities/restaurantImage.entity';
import { User } from '../user/entities/user.entity';
import { PermissionModule } from '../permission/permission.module';
import { FileModule } from '../file/file.module';
import { RestaurantController } from './restaurant.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant, RestaurantImage, User]),
    UserModule,
    StripeModule,
    PermissionModule,
    FileModule,
  ],
  providers: [RestaurantService, RestaurantResolver],
  exports: [RestaurantService],
  controllers: [RestaurantController],
})
export class RestaurantModule {}
