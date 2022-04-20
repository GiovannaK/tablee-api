import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    private readonly stripeService: StripeService,
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
}
