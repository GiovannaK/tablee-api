import {
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/userRoles.decorator';
import { UserRole } from '../user/entities/role/userRole';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':id')
  @UseInterceptors(FilesInterceptor('files[]', 10))
  async createRestaurantImages(
    @Param('id') restaurantId: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const images = await this.imagesService.createRestaurantImages(
      restaurantId,
      files,
    );

    return images;
  }
}
