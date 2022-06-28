import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantService } from '../restaurant/restaurant.service';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    private readonly restaurantService: RestaurantService,
    private readonly userService: UserService,
  ) {}

  async addRestaurantToFavorite(currentUser: User, restaurantId: string) {
    const getRestaurant =
      await this.restaurantService.getRestaurantByIdNoRelations(restaurantId);

    const getPreviousFavorites = await this.getFavoriteRestaurants(currentUser);

    const createFavorite = await this.favoriteRepository.create({
      ...getPreviousFavorites,
      user: currentUser,
      restaurant: getRestaurant,
    });

    const createdFavorite = await this.favoriteRepository.save(createFavorite);

    if (!createdFavorite) {
      throw new InternalServerErrorException('Favorite restaurant not created');
    }

    return createdFavorite;
  }

  async getFavoriteRestaurants(currentUser: User) {
    const getFavoriteRestaurants = await this.favoriteRepository
      .createQueryBuilder('favorite')
      .leftJoinAndSelect('favorite.user', 'user')
      .leftJoinAndSelect('favorite.restaurant', 'restaurant')
      .where('user.id = :userId', { userId: currentUser.id })
      .getMany();

    return getFavoriteRestaurants;
  }

  async isFavoriteFromCurrentUser(currentUser: User, favoriteId: string) {
    const getFavorite = await this.favoriteRepository
      .createQueryBuilder('favorite')
      .leftJoinAndSelect('favorite.user', 'user')
      .where('user.id = :userId', { userId: currentUser.id })
      .andWhere('favorite.id = :favoriteId', { favoriteId })
      .getOne();

    if (!getFavorite) {
      throw new InternalServerErrorException('Favorite not found');
    }
    return getFavorite;
  }

  async deleteFromFavorite(currentUser: User, favoriteId: string) {
    const getFavorite = await this.isFavoriteFromCurrentUser(
      currentUser,
      favoriteId,
    );

    const deleteFavorite = await this.favoriteRepository.delete(getFavorite.id);

    if (!deleteFavorite) {
      throw new InternalServerErrorException('Favorite not deleted');
    }

    return true;
  }
}
