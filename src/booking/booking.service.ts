/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateBookingInput } from './dto/create-booking.input';
import { Booking } from './entities/booking.entity';
import { RestaurantService } from '../restaurant/restaurant.service';
const crypto = require('crypto');

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private readonly restaurantService: RestaurantService,
  ) {}

  async createBooking(
    createBookingInput: CreateBookingInput,
    currentUser: User,
  ) {
    const restaurant =
      await this.restaurantService.getRestaurantByIdNoRelations(
        createBookingInput.restaurantId,
      );
    const createBooking = await this.bookingRepository.create({
      ...createBookingInput,
      restaurant,
      user: currentUser,
      code: this.generateCode(),
    });

    const createdBooking = await this.bookingRepository.save(createBooking);

    if (!createdBooking) {
      throw new InternalServerErrorException('Cannot create booking');
    }

    const getCreatedBooking = await this.getBookingByIdWithAllRelations(
      createdBooking.id,
    );

    return getCreatedBooking;
  }

  generateCode() {
    const code = crypto.randomBytes(3).toString('hex');
    return code;
  }

  async getBookingByIdWithAllRelations(id: string) {
    const booking = await this.bookingRepository.findOne(id, {
      relations: ['user', 'restaurant'],
    });

    if (!booking) {
      throw new InternalServerErrorException('Cannot find booking');
    }

    return {
      booking: booking,
      user: booking.user,
      restaurant: booking.restaurant,
    };
  }
}
