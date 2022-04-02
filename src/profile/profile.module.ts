import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { FileModule } from '../file/file.module';
import { Profile } from './entities/profile.entity';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User]), FileModule, UserModule],
  exports: [ProfileService],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
