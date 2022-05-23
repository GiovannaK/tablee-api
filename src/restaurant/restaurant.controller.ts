import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { CurrentUser } from '../user/decorators/currentUser.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('/:restaurantId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  async AddMenuItemImage(
    @CurrentUser() currentUser: User,
    @UploadedFile() file: Express.Multer.File,
    @Param('restaurantId') restaurantId: string,
  ) {
    return await this.restaurantService.addRestaurantThumb(
      restaurantId,
      currentUser,
      file.buffer,
      file.originalname,
    );
  }
}
