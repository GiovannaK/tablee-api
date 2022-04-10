import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesResolver } from './images.resolver';

@Module({
  providers: [ImagesService, ImagesResolver]
})
export class ImagesModule {}
