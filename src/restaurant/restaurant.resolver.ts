import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/userRoles.decorator';
import { CurrentUser } from '../user/decorators/currentUser.decorator';
import { UserRole } from '../user/entities/role/userRole';
import { User } from '../user/entities/user.entity';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { RestaurantsAndCount } from './dto/restaurants-count';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { UsersRestaurant } from './dto/users-restaurant';
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
  ) {
    const restaurant = await this.restaurantService.createRestaurant(
      data,
      currentUser,
    );
    return restaurant;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => Restaurant)
  async getRestaurantById(@Args('id') id: string) {
    const restaurant = await this.restaurantService.getRestaurantById(id);
    return restaurant;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => UsersRestaurant)
  async getUsersFromRestaurant(@Args('restaurantId') restaurantId: string) {
    const restaurant = await this.restaurantService.getAllUsersFromRestaurant(
      restaurantId,
    );
    return restaurant;
  }

  @Query(() => RestaurantsAndCount)
  async listAllRestaurants(
    @Args({ name: 'relations', type: () => [String] }) relations: string[],
  ) {
    const restaurants =
      await this.restaurantService.listAllrestaurantsWithCountAndRelations(
        relations,
      );
    return restaurants;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => UsersRestaurant)
  async getUsersFromRole(
    @Args('restaurantId') restaurantId: string,
    @Args({ name: 'roles', type: () => [UserRole] }) roles: UserRole[],
  ) {
    const restaurant = await this.restaurantService.getUsersFromRole(
      restaurantId,
      roles,
    );
    return restaurant;
  }

  @Roles(UserRole.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Restaurant)
  async updateRestaurant(
    @Args('data') data: UpdateRestaurantInput,
    @Args('restaurantId') restaurantId: string,
    @CurrentUser() currentUser: User,
  ) {
    const restaurant = await this.restaurantService.updateRestaurant(
      currentUser,
      data,
      restaurantId,
    );
    return restaurant;
  }
}
