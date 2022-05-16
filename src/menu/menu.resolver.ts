import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/userRoles.decorator';
import { CurrentUser } from '../user/decorators/currentUser.decorator';
import { UserRole } from '../user/entities/role/userRole';
import { User } from '../user/entities/user.entity';
import { CreateMenuInput } from './dto/create-menu.input';
import { Menu } from './entities/menu.entity';
import { MenuService } from './menu.service';

@Resolver()
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Menu)
  async createMenu(
    @Args('data') data: CreateMenuInput,
    @CurrentUser() currentUser: User,
  ) {
    const menu = await this.menuService.createMenu(data, currentUser);
    return menu;
  }
}
