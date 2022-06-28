import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/userRoles.decorator';
import { CurrentUser } from '../user/decorators/currentUser.decorator';
import { UserRole } from '../user/entities/role/userRole';
import { User } from '../user/entities/user.entity';
import { Favorite } from './entities/favorite.entity';
import { FavoriteService } from './favorite.service';
@Resolver()
export class FavoriteResolver {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Roles(UserRole.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Favorite)
  async createaFavorite(
    @CurrentUser() currentUser: User,
    @Args('restaurantId') restaurantId: string,
  ) {
    const favorite = await this.favoriteService.addRestaurantToFavorite(
      currentUser,
      restaurantId,
    );
    return favorite;
  }

  @Roles(UserRole.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Boolean)
  async deleteFavorite(
    @CurrentUser() currentUser: User,
    @Args('favoriteId') favoriteId: string,
  ) {
    const favorite = await this.favoriteService.deleteFromFavorite(
      currentUser,
      favoriteId,
    );
    return favorite;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => [Favorite])
  async getFavoritesByUser(@CurrentUser() currentUser: User) {
    const favorites = await this.favoriteService.getFavoriteRestaurants(
      currentUser,
    );
    return favorites;
  }
}
