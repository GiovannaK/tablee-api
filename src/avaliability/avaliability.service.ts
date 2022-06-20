import { Injectable } from '@nestjs/common';
import { BookingService } from '../booking/booking.service';
import { RestaurantService } from '../restaurant/restaurant.service';
import { TableService } from '../table/table.service';

@Injectable()
export class AvaliabilityService {
  constructor(
    restaurantService: RestaurantService,
    bookingService: BookingService,
    tableService: TableService,
  ) {}

  async checkForAvaliability(restaurantService, bookingService, tableService) {
    
  }
}
