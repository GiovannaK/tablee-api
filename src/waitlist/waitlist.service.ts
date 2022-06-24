import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingService } from '../booking/booking.service';
import { Repository } from 'typeorm';
import { WaitList } from './entities/waitList.entity';
import { RestaurantService } from '../restaurant/restaurant.service';
import { User } from '../user/entities/user.entity';
import { CreateBookingInput } from '../booking/dto/create-booking.input';
import { PermissionService } from '../permission/permission.service';
import { UserRole } from 'src/user/entities/role/userRole';

@Injectable()
export class WaitlistService {
  constructor(
    @InjectRepository(WaitList)
    private readonly waitListRepository: Repository<WaitList>,
    private readonly bookingService: BookingService,
    private readonly permissionService: PermissionService,
    private readonly restaurantService: RestaurantService,
  ) {}

  async createBookingByWaitList(
    createBookingInput: CreateBookingInput,
    currentUser: User,
    createdByWaitList: boolean,
  ) {
    const bookingByWaitList = await this.bookingService.createBooking(
      createBookingInput,
      currentUser,
      createdByWaitList,
    );

    const getWaitList = await this.getWaitListWithBookings(
      currentUser,
      createBookingInput.restaurantId,
    );

    return bookingByWaitList;
  }

  async createWaitList(currentUser: User, restaurantId: string) {
    console.log('HEEERE');
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      restaurantId,
      [UserRole.MANAGER, UserRole.OWNER],
    );

    const getRestaurant =
      await this.restaurantService.getRestaurantByIdNoRelations(restaurantId);

    const createWaitList = await this.waitListRepository.create({
      restaurant: getRestaurant,
      booking: [],
    });

    const createdWaitList = await this.waitListRepository.save(createWaitList);

    if (!createdWaitList) {
      throw new InternalServerErrorException('Cannot create wait list');
    }
    return true;
  }

  async getWaitListWithBookings(currentUser: User, restaurantId: string) {
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      restaurantId,
      [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.OWNER],
    );

    const waitList = await this.waitListRepository
      .createQueryBuilder('waitList')
      .leftJoinAndSelect('waitList.restaurant', 'restaurant')
      .leftJoinAndSelect('waitList.booking', 'booking')
      .where('restaurant.id = :restaurantId', { restaurantId })
      .getOne();

    if (!waitList) {
      throw new InternalServerErrorException('Cannot fetch waitList');
    }

    return waitList;
  }
}
