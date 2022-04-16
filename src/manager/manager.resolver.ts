import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../user/decorators/currentUser.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/userRoles.decorator';
import { UserRole } from '../user/entities/role/userRole';
import { User } from '../user/entities/user.entity';
import { CreateManagerInput } from './dto/create-manager.input';
import { ManagerService } from './manager.service';

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
}
