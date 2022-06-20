import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/userRoles.decorator';
import { CurrentUser } from '../user/decorators/currentUser.decorator';
import { UserRole } from '../user/entities/role/userRole';
import { User } from '../user/entities/user.entity';
import { CancellationService } from './cancellation.service';
import { CreatePolicyInput } from './dto/create-policy.input';
import { UpdatePolicyInput } from './dto/update-policy.input';
import { CancellationPolicy } from './entities/cancellation.entity';

@Resolver()
export class CancellationResolver {
  constructor(
    private readonly cancellationPolicyService: CancellationService,
  ) {}

  @Roles(UserRole.MANAGER, UserRole.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => CancellationPolicy)
  async createPolicy(
    @Args('data') data: CreatePolicyInput,
    @CurrentUser() currentUser: User,
  ) {
    const policy =
      await this.cancellationPolicyService.createCancellationPolicy(
        data,
        currentUser,
      );
    return policy;
  }

  @Roles(UserRole.MANAGER, UserRole.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => CancellationPolicy)
  async updatePolicy(
    @Args('data') data: UpdatePolicyInput,
    @CurrentUser() currentUser: User,
  ) {
    const policy =
      await this.cancellationPolicyService.updateCancellationPolicy(
        data,
        currentUser,
      );
    return policy;
  }

  @Query(() => CancellationPolicy)
  async findPolicyByRestaurant(@Args('restaurantId') restaurantId: string) {
    const policy =
      await this.cancellationPolicyService.findCancellationPolicyByRestaurantId(
        restaurantId,
      );
    return policy;
  }
}
