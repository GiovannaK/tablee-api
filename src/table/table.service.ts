import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionService } from '../permission/permission.service';
import { RestaurantService } from '../restaurant/restaurant.service';
import { Repository } from 'typeorm';
import { Table } from './entities/table.entity';
import { User } from '../user/entities/user.entity';
import { CreateTableInput } from './dto/create-table.input';
import { UserRole } from '../user/entities/role/userRole';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
    private readonly permissionService: PermissionService,
    private readonly restaurantService: RestaurantService,
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
}
