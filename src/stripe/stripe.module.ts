import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeResolver } from './stripe.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Restaurant } from '../restaurant/entities/restaurant.entity';
import { PermissionModule } from '../permission/permission.module';

@Module({
  providers: [StripeService, StripeResolver],
  imports: [TypeOrmModule.forFeature([User, Restaurant]), PermissionModule],
  exports: [StripeService],
})
export class StripeModule {}
