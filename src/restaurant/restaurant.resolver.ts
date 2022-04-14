import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/userRoles.decorator';
import { CurrentUser } from '../user/decorators/currentUser.decorator';
import { UserRole } from '../user/entities/role/userRole';
import { User } from '../user/entities/user.entity';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurant.service';

@Resolver()
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Roles(UserRole.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Restaurant)
  async createRestaurant(
    @Args('data') data: CreateRestaurantInput,
    @CurrentUser() currentUser: User,
  ): Promise<Restaurant> {
    const restaurant = await this.restaurantService.createRestaurant(
      data,
      currentUser,
    );
    return restaurant;
  }

  @Query(() => Restaurant)
  async getRestaurantById(@Args('id') id: string) {
    const restaurant = await this.restaurantService.getRestaurantById(id);
    return restaurant;
  }
}
