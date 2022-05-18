import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { MenuService } from './menu.service';
import { CurrentUser } from '../user/decorators/currentUser.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('/:restaurantId/:menuId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  async AddMenuItemImage(
    @CurrentUser() currentUser: User,
    @UploadedFile() file: Express.Multer.File,
    @Param('restaurantId') restaurantId: string,
    @Param('menuItemId') menuItemId: string,
  ) {
    return await this.menuService.addImageToMenuItem(
      restaurantId,
      menuItemId,
      currentUser,
      file.buffer,
      file.originalname,
    );
  }
}
