import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerResolver } from './owner.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { StripeModule } from '../stripe/stripe.module';

@Module({
  providers: [OwnerService, OwnerResolver],
  imports: [TypeOrmModule.forFeature([User]), UserModule, StripeModule],
})
export class OwnerModule {}
