import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../user/decorators/currentUser.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/userRoles.decorator';
import { UserRole } from '../user/entities/role/userRole';
import { User } from '../user/entities/user.entity';
import { CreateManagerInput } from './dto/create-manager.input';
import { ManagerService } from './manager.service';
import { UpdateManagerInput } from './dto/update-manager.input';

@Resolver()
export class ManagerResolver {
  constructor(private readonly managerService: ManagerService) {}

  @Roles(UserRole.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => User)
  async createManager(
    @Args('data') data: CreateManagerInput,
    @CurrentUser() currentUser: User,
  ) {
    const manager = await this.managerService.createManager(
      data,
      currentUser,
      data.restaurantId,
    );
    return manager;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => [User])
  async listManagersByRestaurant(@Args('restaurantId') restaurantId: string) {
    const managers = await this.managerService.listManagerByRestaurant(
      restaurantId,
    );
    return managers;
  }

  @Roles(UserRole.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => User)
  async updateManager(
    @Args('data') data: UpdateManagerInput,
    @CurrentUser() currentUser: User,
  ) {
    const user = await this.managerService.updateManager(
      currentUser,
      data,
      data.restaurantId,
      data.id,
    );
    return user;
  }
}
