import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/userRoles.decorator';
import { CurrentUser } from '../user/decorators/currentUser.decorator';
import { UserRole } from '../user/entities/role/userRole';
import { User } from '../user/entities/user.entity';
import { CreateMenuItemInput } from './dto/create-menu-item.input';
import { CreateMenuInput } from './dto/create-menu.input';
import { MenuMenuItems } from './dto/menu-menu-items';
import { UpdateMenuItemInput } from './dto/update-menu-item.input';
import { UpdateMenuInput } from './dto/update-menu.input';
import { Menu } from './entities/menu.entity';
import { MenuItem } from './entities/menuItem.entity';
import { MenuService } from './menu.service';

@Resolver()
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Menu)
  async createMenu(
    @Args('data') data: CreateMenuInput,
    @CurrentUser() currentUser: User,
  ) {
    const menu = await this.menuService.createMenu(data, currentUser);
    return menu;
  }

  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => MenuItem)
  async createMenuItem(
    @Args('data') data: CreateMenuItemInput,
    @CurrentUser() currentUser: User,
  ) {
    const menu = await this.menuService.createMenuItem(data, currentUser);
    return menu;
  }

  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Menu)
  async updateMenu(
    @Args('data') data: UpdateMenuInput,
    @CurrentUser() currentUser: User,
  ) {
    const menu = await this.menuService.updateMenu(data, currentUser);
    return menu;
  }

  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => MenuItem)
  async updateMenuItem(
    @Args('data') data: UpdateMenuItemInput,
    @CurrentUser() currentUser: User,
  ) {
    const menu = await this.menuService.updateMenuItem(data, currentUser);
    return menu;
  }

  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Boolean)
  async deleteMenu(
    @Args('id') id: string,
    @Args('restaurantId') restaurantId: string,
    @CurrentUser() currentUser: User,
  ) {
    const menu = await this.menuService.deleteMenu(
      id,
      restaurantId,
      currentUser,
    );
    return menu;
  }

  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Boolean)
  async deleteMenuItem(
    @Args('id') id: string,
    @Args('restaurantId') restaurantId: string,
    @CurrentUser() currentUser: User,
  ) {
    const menu = await this.menuService.deleteMenuItem(
      id,
      restaurantId,
      currentUser,
    );
    return menu;
  }

  @Query(() => MenuMenuItems)
  async getMenuWithItems(@Args('menuId') menuId: string) {
    const menu = await this.menuService.getMenuWithMenuItems(menuId);
    return menu;
  }

  @Query(() => [Menu])
  async getAllRestaurantMenusWithItems(
    @Args('restaurantId') restaurantId: string,
  ) {
    const menus = await this.menuService.getAllMenusWithItems(restaurantId);
    return menus;
  }

  @Query(() => Menu)
  async getMenu(@Args('menuId') menuId: string) {
    const menu = await this.menuService.getMenu(menuId);
    return menu;
  }

  @Query(() => MenuItem)
  async getMenuItem(@Args('menuItemId') menuItemId: string) {
    const menu = await this.menuService.getMenuItem(menuItemId);
    return menu;
  }
}
