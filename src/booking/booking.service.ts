/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateBookingInput } from './dto/create-booking.input';
import { Booking } from './entities/booking.entity';
import { RestaurantService } from '../restaurant/restaurant.service';
import { PermissionService } from '../permission/permission.service';
import { UserRole } from 'src/user/entities/role/userRole';
import { BookingStatusPortuguese } from './entities/enums/bookingStatus.enum';
const crypto = require('crypto');

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private readonly restaurantService: RestaurantService,
    private readonly permissionService: PermissionService,
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
      relations: ['user', 'restaurant', 'table'],
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

  async getBookingWithRelations(id: string, relations: string[]) {
    const booking = await this.bookingRepository.findOne(id, {
      relations,
    });

    if (!booking) {
      throw new InternalServerErrorException('Cannot find booking');
    }

    return booking;
  }

  async getCurrentUserBookings(currentUser: User) {
    const bookings = await this.bookingRepository.find({
      where: { user: currentUser },
      relations: ['restaurant'],
    });

    if (!bookings) {
      throw new InternalServerErrorException('Cannot find bookings');
    }

    return bookings;
  }

  async getRestaurantBookings(currentUser: User, restaurantId: string) {
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      restaurantId,
      [UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE],
    );

    const bookings = await this.bookingRepository.find({
      where: { restaurant: restaurantId },
      relations: ['user'],
    });

    if (!bookings) {
      throw new InternalServerErrorException('Cannot find bookings');
    }

    return bookings;
  }

  async getBookingWithoutRelations(id: string) {
    const booking = await this.bookingRepository.findOne(id);

    if (!booking) {
      throw new InternalServerErrorException('Cannot find booking');
    }

    return booking;
  }

  async approveBooking(
    currentUser: User,
    restaurantId: string,
    bookingId: string,
  ) {
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      restaurantId,
      [UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE],
    );

    const findBooking = await this.getBookingByIdWithAllRelations(bookingId);

    await this.bookingRepository
      .createQueryBuilder()
      .update(Booking)
      .set({
        bookingStatus: BookingStatusPortuguese.APROVADA,
      })
      .where('id = :bookingId', { bookingId: findBooking.booking.id })
      .returning('*')
      .updateEntity(true)
      .execute();

    const findBookingUpdatedBooking = await this.getBookingByIdWithAllRelations(
      bookingId,
    );
    return findBookingUpdatedBooking;
  }

  async rejectBooking(
    currentUser: User,
    restaurantId: string,
    bookingId: string,
  ) {
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      restaurantId,
      [UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE],
    );

    const findBooking = await this.getBookingByIdWithAllRelations(bookingId);

    const updateBookingStatus = await this.bookingRepository
      .createQueryBuilder()
      .update(Booking)
      .set({
        bookingStatus: BookingStatusPortuguese.REJEITADA,
      })
      .where('id = :bookingId', { bookingId: findBooking.booking.id })
      .returning('*')
      .updateEntity(true)
      .execute();

    if (!updateBookingStatus.affected) {
      throw new InternalServerErrorException('Cannot update booking');
    }

    const findBookingUpdatedBooking = await this.getBookingByIdWithAllRelations(
      bookingId,
    );
    return findBookingUpdatedBooking;
  }

  async getBookingByStatusForRestaurant(
    status: BookingStatusPortuguese,
    restaurantId: string,
    currentUser: User,
  ) {
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      restaurantId,
      [UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE],
    );
    const booking = await this.bookingRepository
      .createQueryBuilder('booking')
      .innerJoinAndSelect('booking.restaurant', 'restaurant')
      .where('restaurant.id = :restaurantId', { restaurantId })
      .andWhere('booking.bookingStatus = :status', { status })
      .getMany();

    return booking;
  }

  async getBookingsByUser(currentUser: User) {
    const bookings = await this.bookingRepository
      .createQueryBuilder('booking')
      .innerJoinAndSelect('booking.user', 'user')
      .where('user.id = :userId', { userId: currentUser.id })
      .getMany();

    return bookings;
  }
}
