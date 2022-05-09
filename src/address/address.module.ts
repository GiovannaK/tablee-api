import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressResolver } from './address.resolver';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { User } from '../user/entities/user.entity';
import { Restaurant } from '../restaurant/entities/restaurant.entity';
import { PermissionModule } from '../permission/permission.module';

@Module({
  providers: [AddressService, AddressResolver],
  imports: [
    RestaurantModule,
    UserModule,
    PermissionModule,
    TypeOrmModule.forFeature([Address, User, Restaurant]),
  ],
})
export class AddressModule {}
