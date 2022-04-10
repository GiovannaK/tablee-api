import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { Restaurant } from '../restaurant/entities/restaurant.entity';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET, {
      apiVersion: '2020-08-27',
    });
  }

  async createCustomer(name: string, email: string) {
    return this.stripe.customers.create({
      name,
      email,
    });
  }

  async createRestaurantStripe(createdRestaurant: Restaurant) {
    const account = await this.stripe.accounts.create({
      type: 'express',
      country: 'BR',
      email: createdRestaurant.email,
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
    });

    if (!account) {
      throw new InternalServerErrorException(
        'Cannot create restaurant account on stripe',
      );
    }

    await this.restaurantRepository.update(createdRestaurant, {
      stripeAccountId: account.id,
    });

    const updatedRestaurant = await this.restaurantRepository.create({
      ...createdRestaurant,
      stripeAccountId: account.id,
    });

    await this.restaurantRepository.save(updatedRestaurant);

    return {
      restaurant: updatedRestaurant,
      account,
    };
  }
}
