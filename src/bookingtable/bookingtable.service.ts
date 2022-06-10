import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingService } from '../booking/booking.service';
import { Booking } from '../booking/entities/booking.entity';
import { PermissionService } from 'src/permission/permission.service';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { Table } from '../table/entities/table.entity';
import { Repository } from 'typeorm';
import { UserRole } from '../user/entities/role/userRole';
import { TableStatusPortuguese } from '../table/entities/enums/tableStatus.enum';
import { User } from '../user/entities/user.entity';
import { BookingStatusPortuguese } from '../booking/entities/enums/bookingStatus.enum';
import { TableService } from '../table/table.service';

@Injectable()
export class BookingtableService {
  constructor(
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private readonly permissionService: PermissionService,
    private readonly tableService: TableService,
    private readonly restaurantService: RestaurantService,
    private readonly bookingService: BookingService,
  ) {}

  async vacateTables(tableIds: string[]) {
    const updateTablesToAvailable = await this.tableRepository
      .createQueryBuilder()
      .update(Table)
      .set({
        status: TableStatusPortuguese.DISPONIVEL,
        booking: null,
      })
      .where('id IN (:...tableIds)', { tableIds })
      .updateEntity(true)
      .returning('*')
      .execute();

    if (!updateTablesToAvailable.affected) {
      throw new InternalServerErrorException('Error vacating tables');
    }

    return true;
  }

  async finishBooking(
    bookingId: string,
    currentUser: User,
    restaurantId: string,
  ) {
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      restaurantId,
      [UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE],
    );

    const getTableIds = await this.extractTableIds(bookingId);

    await this.vacateTables(getTableIds);

    const updateStatusToFinish = await this.bookingRepository
      .createQueryBuilder()
      .update(Booking)
      .set({
        bookingStatus: BookingStatusPortuguese.FINALIZADA,
      })
      .where('id = :bookingId', { bookingId })
      .returning('*')
      .updateEntity(true)
      .execute();

    if (!updateStatusToFinish.affected) {
      throw new InternalServerErrorException('Error updating booking status');
    }

    return updateStatusToFinish.raw[0];
  }

  async extractTableIds(bookingId: string) {
    const getTableIds = await this.tableService.getBookedTablesByBooking(
      bookingId,
    );

    const getOnlyIds = getTableIds.map((table) => table.id);

    return getOnlyIds;
  }
}
