import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Restaurant } from '../restaurant/entities/restaurant.entity';
import { Repository } from 'typeorm';
import { RestaurantImage } from './entities/restaurantImage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService } from '../file/file.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(RestaurantImage)
    private readonly restaurantImageRepository: Repository<RestaurantImage>,
    private readonly fileService: FileService,
  ) {}

  async createRestaurantImages(
    restaurantId: string,
    images: Array<Express.Multer.File>,
  ) {
    const getRestaurant = await this.restaurantRepository.findOne(
      restaurantId,
      {
        relations: ['restaurantImage'],
      },
    );
    if (!getRestaurant) {
      throw new InternalServerErrorException('Cannot find restaurant');
    }
    const restaurantImages = await this.fileService.uploadFiles(images);

    const createImages = await Promise.all(
      restaurantImages.map(async (file) => {
        const createdImages = await this.restaurantImageRepository.create({
          key: file.Key,
          url: file.Location,
          restaurant: getRestaurant,
        });
        await this.restaurantImageRepository.save(createdImages);
        return createdImages;
      }),
    );

    if (!createImages) {
      throw new InternalServerErrorException(
        'Error creating restaurant images',
      );
    }

    const getImages = await this.restaurantImageRepository.find({
      relations: ['restaurant'],
    });

    return getImages;
  }

  async deleteRestaurantImage(key: string, id: string) {
    await this.fileService.deleteUploadedFile(key);
    const deleteImageRestaurant = await this.restaurantImageRepository.update(
      id,
      {
        url: null,
        key: null,
      },
    );

    if (!deleteImageRestaurant) {
      throw new InternalServerErrorException('Cannot delete image');
    }
    return;
  }
}
