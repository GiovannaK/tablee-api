import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { RestaurantService } from '../restaurant/restaurant.service';
import { UserRole } from '../user/entities/role/userRole';
import { PermissionService } from '../permission/permission.service';
import { UserService } from 'src/user/user.service';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly restaurantService: RestaurantService,
    private readonly permissionService: PermissionService,
    private readonly userService: UserService,
  ) {}

  async createEmployee(
    createManagerInput: CreateEmployeeInput,
    currentUser: User,
    id: string,
  ) {
    const getRestaurant =
      await this.restaurantService.getRestaurantByIdNoRelations(id);
    if (!getRestaurant) {
      throw new InternalServerErrorException('Cannot find restaurant');
    }
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      id,
      [UserRole.OWNER, UserRole.MANAGER],
    );

    const manager = await this.userRepository.create({
      ...createManagerInput,
      role: UserRole.EMPLOYEE,
    });

    const savedUser = await this.userRepository.save(manager);

    if (!savedUser) {
      throw new InternalServerErrorException(
        `Cannot create manager for restaurant: ${id}`,
      );
    }

    const addManagerToRestaurant = {
      ...manager,
      restaurant: [getRestaurant],
    };

    const addedManagerToRestaurant = await this.userRepository.save(
      addManagerToRestaurant,
    );

    if (!addedManagerToRestaurant) {
      throw new InternalServerErrorException(
        `Cannot add manager to restaurant`,
      );
    }

    const getUserWithRestaurant = await this.userService.getUserRestaurants(
      manager.id,
    );

    return getUserWithRestaurant;
  }

  async listEmployeesByRestaurant(restaurantId: string) {
    const requiredRole = UserRole.EMPLOYEE;
    const getEmployees = await this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.restaurant', 'restaurant')
      .where('restaurant.id = :restaurantId', { restaurantId })
      .andWhere('user.role = :requiredRole', { requiredRole })
      .getMany();

    if (!getEmployees) {
      throw new InternalServerErrorException(
        'Cannot find employees for this restaurant',
      );
    }

    return getEmployees;
  }

  async updateEmployee(
    currentUser: User,
    updateEmployeeInput: UpdateEmployeeInput,
    restaurantId: string,
    employeeId: string,
  ) {
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      restaurantId,
      [UserRole.OWNER, UserRole.MANAGER],
    );

    delete updateEmployeeInput.restaurantId;
    delete updateEmployeeInput.id;

    const user = await this.userRepository
      .createQueryBuilder()
      .update('User')
      .set({
        ...updateEmployeeInput,
      })
      .where('id = :employeeId', { employeeId })
      .updateEntity(true)
      .execute();

    if (!user) {
      throw new InternalServerErrorException('Cannot update employee');
    }
    const getUpdatedUser = await this.userService.getUserById(employeeId);

    return getUpdatedUser;
  }

  async deleteEmployee(
    employeeId: string,
    restaurantId: string,
    currentUser: User,
  ) {
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      restaurantId,
      [UserRole.OWNER, UserRole.MANAGER],
    );

    const deleteEmployee = await this.userRepository.softDelete({
      id: employeeId,
    });

    if (!deleteEmployee.affected) {
      throw new InternalServerErrorException('Cannot delete employee');
    }

    return true;
  }
}
