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
import { CreateMenuItemInput } from './dto/create-menu-item.input';
import { UpdateMenuInput } from './dto/update-menu.input';
import { UpdateMenuItemInput } from './dto/update-menu-item.input';

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
      [UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE],
    );

    const getRestaurant =
      await this.restaurantService.getRestaurantByIdNoRelations(
        createMenuInput.restaurantId,
      );

    const menu = await this.menuRepository.create({
      ...createMenuInput,
      restaurant: getRestaurant,
    });

    const createdMenu = await this.menuRepository.save(menu);

    if (!createdMenu) {
      throw new InternalServerErrorException('Error creating menu');
    }

    return createdMenu;
  }

  async createMenuItem(
    createMenuItemInput: CreateMenuItemInput,
    currentUser: User,
  ) {
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      createMenuItemInput.restaurantId,
      [UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE],
    );

    const getCurrentMenu = await this.getMenu(createMenuItemInput.menuId);

    const createMenuItem = await this.menuItemRepository.create({
      ...createMenuItemInput,
      menu: getCurrentMenu,
    });

    const createdMenuItem = await this.menuItemRepository.save(createMenuItem);

    if (!createdMenuItem) {
      throw new InternalServerErrorException('Error creating menu item');
    }

    return createdMenuItem;
  }

  async addImageToMenuItem(
    restaurantId: string,
    menuItemId: string,
    currentUser: User,
    imageBuffer: Buffer,
    filename: string,
  ) {
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      restaurantId,
      [UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE],
    );

    const getMenuItem = await this.getMenuItem(menuItemId);

    if (getMenuItem.url) {
      await this.deleteMenuItemImage(getMenuItem.key, getMenuItem.id);
    }

    const image = await this.fileService.uploadFile(imageBuffer, filename);

    await this.menuItemRepository.update(getMenuItem.id, {
      url: image.url,
      key: image.key,
    });

    const updatedMenuItem = await this.menuItemRepository.create({
      ...getMenuItem,
      url: image.url,
      key: image.key,
    });

    if (!updatedMenuItem) {
      throw new InternalServerErrorException('Error updating menu item');
    }

    return updatedMenuItem;
  }

  async getMenu(id: string) {
    const menu = await this.menuRepository.findOne(id);

    if (!menu) {
      throw new InternalServerErrorException('Error getting menu');
    }

    return menu;
  }

  async getMenuItem(id: string) {
    const menuItem = await this.menuItemRepository.findOne(id);

    if (!menuItem) {
      throw new InternalServerErrorException('Cannot find menu item');
    }

    return menuItem;
  }

  async deleteMenuItemImage(key: string, id: string) {
    await this.fileService.deleteUploadedFile(key);
    const deleteFromMenuItem = await this.menuItemRepository.update(id, {
      url: null,
      key: null,
    });

    if (!deleteFromMenuItem) {
      throw new InternalServerErrorException('Cannot delete menu item image');
    }

    return;
  }

  async getMenuWithMenuItems(menuId: string) {
    const menu = await this.menuRepository.findOne(menuId, {
      relations: ['menuItem'],
    });

    if (!menu) {
      throw new InternalServerErrorException(
        'Cannot find menu with menu items',
      );
    }

    return {
      menu,
      menuItem: menu.menuItem,
    };
  }

  async updateMenu(updateMenuInput: UpdateMenuInput, currentUser: User) {
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      updateMenuInput.restaurantId,
      [UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE],
    );
    const findMenu = await this.getMenu(updateMenuInput.id);
    const id = findMenu.id;

    delete updateMenuInput.restaurantId;

    const updateMenu = await this.menuRepository
      .createQueryBuilder()
      .update(Menu)
      .set({
        ...updateMenuInput,
      })
      .where('id = :id', { id })
      .returning('*')
      .updateEntity(true)
      .execute();

    return updateMenu.raw[0];
  }

  async updateMenuItem(
    updateMenuItemInput: UpdateMenuItemInput,
    currentUser: User,
  ) {
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      updateMenuItemInput.restaurantId,
      [UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE],
    );

    const findMenuItem = await this.getMenuItem(updateMenuItemInput.id);
    const id = findMenuItem.id;

    delete updateMenuItemInput.restaurantId;

    const updateMenu = await this.menuRepository
      .createQueryBuilder()
      .update(MenuItem)
      .set({
        ...updateMenuItemInput,
      })
      .where('id = :id', { id })
      .returning('*')
      .updateEntity(true)
      .execute();

    return updateMenu.raw[0];
  }

  async deleteMenu(id: string, restaurantId: string, currentUser: User) {
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      restaurantId,
      [UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE],
    );

    const deleteMenu = await this.menuRepository.delete(id);

    if (!deleteMenu) {
      throw new InternalServerErrorException('Error deleting menu');
    }

    return true;
  }

  async deleteMenuItem(id: string, restaurantId: string, currentUser: User) {
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      restaurantId,
      [UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE],
    );

    const deleteMenu = await this.menuItemRepository.delete(id);

    if (!deleteMenu) {
      throw new InternalServerErrorException('Error deleting menu item');
    }

    return true;
  }
}
