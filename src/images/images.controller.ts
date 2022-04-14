import {
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

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
