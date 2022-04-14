import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { RestaurantImage } from './entities/restaurantImage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from '../restaurant/entities/restaurant.entity';
import { ImagesController } from './images.controller';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RestaurantImage, Restaurant]),
    FileModule,
  ],
  providers: [ImagesService],
  exports: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
