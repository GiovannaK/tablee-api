import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionService } from '../permission/permission.service';
import { UpdateRestaurantInput } from '../restaurant/dto/update-restaurant.input';
import { UserRole } from '../user/entities/role/userRole';
import { FileService } from '../file/file.service';
import { AvaliabilitySearch } from '../avaliability/dto/avaliability.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    private readonly stripeService: StripeService,
    private readonly permissionService: PermissionService,
    private readonly fileService: FileService,
  ) {}

  async createRestaurant(restaurantInput: CreateRestaurantInput, user: User) {
    const restaurant = await this.restaurantRepository.create({
      ...restaurantInput,
    });
    const savedRestaurant = await this.restaurantRepository.save(restaurant);
    if (!savedRestaurant) {
      throw new InternalServerErrorException('Cannot create restaurant');
    }
    const addUserToRestaurant = {
      ...restaurant,
      user: [user],
    };
    const addRestaurantAndUser = await this.restaurantRepository.save(
      addUserToRestaurant,
    );
    if (!addRestaurantAndUser) {
      throw new InternalServerErrorException('Cannot add owner to restaurant');
    }
    await this.stripeService.createRestaurantStripe(restaurant);
    const getRestaurantWithRelations = await this.getRestaurantById(
      restaurant.id,
    );
    return getRestaurantWithRelations;
  }

  async getRestaurantById(id: string) {
    const restaurant = await this.restaurantRepository.findOne(id, {
      relations: ['user', 'restaurantImage'],
    });

    if (!restaurant) {
      throw new InternalServerErrorException('Cannot find restaurant');
    }

    return restaurant;
  }

  async getRestaurantByIdNoRelations(id: string) {
    const restaurant = await this.restaurantRepository.findOne(id);

    if (!restaurant) {
      throw new InternalServerErrorException('Cannot find restaurant');
    }

    return restaurant;
  }

  async updateRestaurant(
    currentUser: User,
    updateRestaurantInput: UpdateRestaurantInput,
    restaurantId: string,
  ) {
    await this.permissionService.hasRequiredPermissionForRestaurant(
      currentUser.id,
      restaurantId,
      UserRole.OWNER,
    );

    const restaurant = await this.restaurantRepository
      .createQueryBuilder()
      .update('Restaurant')
      .set({
        ...updateRestaurantInput,
      })
      .where('id = :restaurantId', { restaurantId })
      .updateEntity(true)
      .execute();

    if (!restaurant) {
      throw new InternalServerErrorException('Cannot update restaurant');
    }
    const getUpdatedRestaurant = await this.getRestaurantById(restaurantId);

    return getUpdatedRestaurant;
  }

  async addRestaurantThumb(
    restaurantId: string,
    currentUser: User,
    imageBuffer: Buffer,
    filename: string,
  ) {
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      restaurantId,
      [UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE],
    );

    const getRestaurant = await this.getRestaurantByIdNoRelations(restaurantId);

    if (getRestaurant.thumbUrl) {
      await this.deleteRestaurantImageThumb(
        getRestaurant.thumbKey,
        getRestaurant.id,
      );
    }

    const image = await this.fileService.uploadFile(imageBuffer, filename);

    await this.restaurantRepository.update(getRestaurant.id, {
      thumbUrl: image.url,
      thumbKey: image.key,
    });

    const updatedRestaurantThumb = await this.restaurantRepository.create({
      ...getRestaurant,
      thumbUrl: image.url,
      thumbKey: image.key,
    });

    if (!updatedRestaurantThumb) {
      throw new InternalServerErrorException('Cannot add restaurant thumb');
    }

    return updatedRestaurantThumb;
  }

  async deleteRestaurantImageThumb(key: string, id: string) {
    await this.fileService.deleteUploadedFile(key);
    const deleteFromMenuItem = await this.restaurantRepository.update(id, {
      thumbUrl: null,
      thumbKey: null,
    });

    if (!deleteFromMenuItem) {
      throw new InternalServerErrorException('Cannot delete menu item image');
    }

    return;
  }

  async getAllUsersFromRestaurant(restaurantId: string) {
    const getUsersFromRestaurant = await this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.restaurant', 'restaurant')
      .where('restaurant.id = :restaurantId', { restaurantId })
      .getManyAndCount();

    if (!getUsersFromRestaurant) {
      throw new InternalServerErrorException(
        'Cannot find users from restaurant',
      );
    }
    return {
      users: getUsersFromRestaurant[0],
      count: getUsersFromRestaurant[1],
    };
  }

  async getUsersFromRole(restaurantId: string, roles: UserRole[]) {
    const getUsers = await this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.restaurant', 'restaurant')
      .where('restaurant.id = :restaurantId', { restaurantId })
      .andWhere('user.role IN (:...roles)', { roles })
      .getManyAndCount();

    if (!getUsers) {
      throw new InternalServerErrorException(
        'Cannot find users from restaurant by role',
      );
    }

    return {
      users: getUsers[0],
      count: getUsers[1],
    };
  }

  async listAllrestaurantsWithCountAndRelations(relations: string[]) {
    const restaurants = await this.restaurantRepository.findAndCount({
      relations: [...relations],
    });
    return {
      restaurants: restaurants[0],
      count: restaurants[1],
    };
  }
}
