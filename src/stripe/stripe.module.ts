import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeResolver } from './stripe.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  providers: [StripeService, StripeResolver],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [StripeService],
})
export class StripeModule {}
