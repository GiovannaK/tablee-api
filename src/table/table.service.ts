import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionService } from '../permission/permission.service';
import { RestaurantService } from '../restaurant/restaurant.service';
import { Repository } from 'typeorm';
import { Table } from './entities/table.entity';
import { User } from '../user/entities/user.entity';
import { CreateTableInput } from './dto/create-table.input';
import { UserRole } from '../user/entities/role/userRole';
import { BookingService } from '../booking/booking.service';
import { TableStatusPortuguese } from './entities/enums/tableStatus.enum';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
    private readonly permissionService: PermissionService,
    private readonly restaurantService: RestaurantService,
    private readonly bookingService: BookingService,
  ) {}

  async createTable(createTableInput: CreateTableInput, currentUser: User) {
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      createTableInput.restaurantId,
      [UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE],
    );
    const getRestaurant =
      await this.restaurantService.getRestaurantByIdNoRelations(
        createTableInput.restaurantId,
      );

    const table = await this.tableRepository.create({
      ...createTableInput,
      restaurant: getRestaurant,
    });

    await this.tableRepository.save(table);

    if (!table) {
      throw new InternalServerErrorException('Error creating table');
    }

    return table;
  }

  async createMulipleTablesInBulk(
    createTableInput: CreateTableInput,
    quantity: number,
    currentUser: User,
    initialTableNumber: number,
  ) {
    if (quantity > 10) {
      throw new InternalServerErrorException(
        'Maximum 10 tables can be created at a time',
      );
    }
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      createTableInput.restaurantId,
      [UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE],
    );
    const getRestaurant =
      await this.restaurantService.getRestaurantByIdNoRelations(
        createTableInput.restaurantId,
      );

    const tables = [];
    for (
      let i = initialTableNumber;
      i <= initialTableNumber + quantity - 1;
      i++
    ) {
      const table = await this.tableRepository.create({
        ...createTableInput,
        restaurant: getRestaurant,
        tableNumber: i,
      });

      await this.tableRepository.save(table);
      if (!table) {
        throw new InternalServerErrorException('Error creating table');
      }
      tables.push(table);
    }

    return tables;
  }

  async deleteTable(tableId: string, currentUser: User) {
    const table = await this.tableRepository.findOne({
      where: { id: tableId },
      relations: ['restaurant'],
    });

    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      table.restaurant.id,
      [UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE],
    );

    await this.tableRepository.delete({ id: tableId });

    return true;
  }

  async deleteTablesInBulk(tableIds: string[], currentUser: User) {
    const tables = await this.tableRepository.findByIds(tableIds, {
      relations: ['restaurant'],
    });

    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      tables[0].restaurant.id,
      [UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE],
    );

    await this.tableRepository.delete(tableIds);

    return true;
  }

  async findManyTables(tableIds: string[]) {
    const findTables = await this.tableRepository.findByIds(tableIds);
    if (!findTables) {
      throw new InternalServerErrorException('Error finding tables');
    }

    return findTables;
  }

  async findTablesByRestaurant(restaurantId: string, currentUser: User) {
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      restaurantId,
      [UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE],
    );
    const tables = await this.tableRepository
      .createQueryBuilder('table')
      .innerJoinAndSelect('table.restaurant', 'restaurant')
      .where('restaurant.id = :restaurantId', { restaurantId })
      .getMany();

    if (!tables) {
      throw new InternalServerErrorException('Error finding tables');
    }

    return tables;
  }

  async getBookedTablesByBooking(bookingId: string) {
    const tables = await this.tableRepository
      .createQueryBuilder('table')
      .innerJoinAndSelect('table.booking', 'booking')
      .where('booking.id = :bookingId', { bookingId })
      .getMany();

    if (!tables) {
      throw new InternalServerErrorException('Error finding tables');
    }

    return tables;
  }

  async getBookedTableByBooking(bookingId: string) {
    const table = await this.tableRepository.findOne({
      relations: ['booking'],
      where: { booking: { id: bookingId } },
    });

    if (!table) {
      throw new InternalServerErrorException('Error finding table');
    }

    return table;
  }

  async getTableById(tableId: string) {
    const table = await this.tableRepository.findOne({
      where: { id: tableId },
    });

    if (!table) {
      throw new InternalServerErrorException('Error finding table');
    }

    return table;
  }

  async assignTableToBooking(
    tableId: string,
    currentUser: User,
    bookingId: string,
  ) {
    const booking = await this.bookingService.getBookingByIdWithAllRelations(
      bookingId,
    );
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      booking.restaurant.id,
      [UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE],
    );

    const findTable = await this.getTableById(tableId);

    const addTableToBooking = await this.tableRepository
      .createQueryBuilder()
      .update(Table)
      .set({
        status: TableStatusPortuguese.OCUPADA,
        booking: booking.booking,
      })
      .where('id = :tableId', { tableId: findTable.id })
      .updateEntity(true)
      .execute();

    if (!addTableToBooking.affected) {
      throw new InternalServerErrorException(
        'Error assigning table to booking',
      );
    }

    const getTableByBooking = await this.getBookedTableByBooking(bookingId);

    return getTableByBooking;
  }
}
