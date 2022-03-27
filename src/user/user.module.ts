import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailModule } from '../email/email.module';

@Module({
  providers: [UserService, UserResolver],
  imports: [TypeOrmModule.forFeature([User]), EmailModule],
  exports: [UserService],
})
export class UserModule {}
