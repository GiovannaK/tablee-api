import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMenuInput } from './dto/create-menu.input';
import { Menu } from './entities/menu.entity';
import { MenuItem } from './entities/menuItem.entity';
import { FileService } from '../file/file.service';
import { PermissionService } from '../permission/permission.service';
import { UserRole } from '../user/entities/role/userRole';
import { RestaurantService } from '../restaurant/restaurant.service';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>,
    private readonly fileService: FileService,
    private readonly permissionService: PermissionService,
    private readonly restaurantService: RestaurantService,
  ) {}

  async createMenu(createMenuInput: CreateMenuInput, currentUser: User) {
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      createMenuInput.restaurantId,
      [UserRole.OWNER, UserRole.MANAGER],
    );

    const getRestaurant =
      await this.restaurantService.getRestaurantByIdNoRelations(
        createMenuInput.restaurantId,
      );

    const menu = await this.menuRepository.create({
      ...createMenuInput,
      restaurant: getRestaurant,
    });

    if (!menu) {
      throw new InternalServerErrorException('Error creating menu');
    }

    return menu;
  }
}
