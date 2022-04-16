import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerResolver } from './manager.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Restaurant } from '../restaurant/entities/restaurant.entity';
import { UserModule } from '../user/user.module';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Restaurant]),
    UserModule,
    RestaurantModule,
    PermissionModule,
  ],
  providers: [ManagerService, ManagerResolver],
})
export class ManagerModule {}
