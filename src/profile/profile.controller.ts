import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  async updateProfilePic(
    @Req() request: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.profileService.uploadProfilePic(
      request.user.id,
      file.buffer,
      file.originalname,
    );
  }
}
