import { Module } from '@nestjs/common';
import { GoogleauthService } from './googleauth.service';
import { GoogleauthResolver } from './googleauth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, UserModule],
  providers: [GoogleauthService, GoogleauthResolver],
})
export class GoogleauthModule {}
