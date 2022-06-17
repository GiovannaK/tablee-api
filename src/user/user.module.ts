import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from '../profile/entities/profile.entity';
import { StripeModule } from '../stripe/stripe.module';

@Module({
  providers: [UserService, UserResolver],
  imports: [TypeOrmModule.forFeature([User, Profile]), StripeModule],
  exports: [UserService],
})
export class UserModule {}
