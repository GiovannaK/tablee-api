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
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    private readonly stripeService: StripeService,
  ) {}

  async createRestaurant(
    restaurantInput: CreateRestaurantInput,
    currentUser: User,
  ) {
    const restaurant = this.restaurantRepository.create({
      ...restaurantInput,
      user: [currentUser],
    });
    const createdRestaurant = await this.restaurantRepository.save(restaurant);
    if (!createdRestaurant) {
      throw new InternalServerErrorException('Cannot create restaurant');
    }
    await this.stripeService.createRestaurantStripe(createdRestaurant);
    const getRestaurantWithRelations = await this.getRestaurantById(
      createdRestaurant.id,
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
}
