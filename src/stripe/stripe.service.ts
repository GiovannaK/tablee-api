import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionService } from '../permission/permission.service';
import { User } from '../user/entities/user.entity';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { Restaurant } from '../restaurant/entities/restaurant.entity';
import { UserRole } from '../user/entities/role/userRole';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    private readonly permissionService: PermissionService,
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

  async createAccountLink(user: User, restaurantId: string) {
    const getRestaurant = await this.getRestaurantById(restaurantId);
    await this.permissionService.hasRequiredPermissionForRestaurant(
      user.id,
      restaurantId,
      UserRole.OWNER,
    );
    const accountLink = await this.stripe.accountLinks.create({
      account: getRestaurant.stripeAccountId,
      refresh_url: `${process.env.CLIENT_URL}/reauth`,
      return_url: `${process.env.CLIENT_URL}/seller`,
      type: 'account_onboarding',
    });

    if (!accountLink) {
      throw new InternalServerErrorException(
        'Cannot create an account link for this restaurant',
      );
    }

    return {
      url: accountLink.url,
      object: accountLink.object,
    };
  }

  async createLoginLink(request: Request | any) {
    const loginLink = await this.stripe.accounts.createLoginLink(
      request.user.stripeAccountId,
    );

    if (!loginLink) {
      throw new InternalServerErrorException(
        'Cannot create a login link for current restaurant',
      );
    }

    return loginLink;
  }

  async getRestaurantById(id: string) {
    const restaurant = await this.restaurantRepository.findOne(id);

    if (!restaurant) {
      throw new InternalServerErrorException('Cannot find restaurant');
    }

    return restaurant;
  }
}
