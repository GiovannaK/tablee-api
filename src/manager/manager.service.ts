import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { RestaurantService } from '../restaurant/restaurant.service';
import { UserRole } from '../user/entities/role/userRole';
import { PermissionService } from '../permission/permission.service';
import { UserService } from 'src/user/user.service';
import { CreateManagerInput } from './dto/create-manager.input';
import { UpdateManagerInput } from './dto/update-manager.input';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly restaurantService: RestaurantService,
    private readonly permissionService: PermissionService,
    private readonly userService: UserService,
  ) {}

  async createManager(
    createManagerInput: CreateManagerInput,
    currentUser: User,
    id: string,
  ) {
    const getRestaurant =
      await this.restaurantService.getRestaurantByIdNoRelations(id);
    if (!getRestaurant) {
      throw new InternalServerErrorException('Cannot find restaurant');
    }
    await this.permissionService.hasRequiredPermissionForRestaurant(
      currentUser.id,
      id,
      UserRole.OWNER,
    );

    const manager = await this.userRepository.create({
      ...createManagerInput,
      role: UserRole.MANAGER,
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

  async listManagerByRestaurant(restaurantId: string) {
    const requiredRole = UserRole.MANAGER;
    const getManagers = await this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.restaurant', 'restaurant')
      .where('restaurant.id = :restaurantId', { restaurantId })
      .andWhere('user.role = :requiredRole', { requiredRole })
      .getMany();

    if (!getManagers) {
      throw new InternalServerErrorException(
        'Cannot find managers for this restaurant',
      );
    }

    return getManagers;
  }

  async updateManager(
    currentUser: User,
    updateManagerInput: UpdateManagerInput,
    restaurantId: string,
    managerId: string,
  ) {
    await this.permissionService.hasRequiredPermissionForRestaurant(
      currentUser.id,
      restaurantId,
      UserRole.OWNER,
    );

    delete updateManagerInput.restaurantId;
    delete updateManagerInput.id;

    const user = await this.userRepository
      .createQueryBuilder()
      .update('User')
      .set({
        ...updateManagerInput,
      })
      .where('id = :managerId', { managerId })
      .updateEntity(true)
      .execute();

    if (!user) {
      throw new InternalServerErrorException('Cannot update manager');
    }
    const getUpdatedUser = await this.userService.getUserById(managerId);

    return getUpdatedUser;
  }

  async deleteManager(
    managerId: string,
    restaurantId: string,
    currentUser: User,
  ) {
    await this.permissionService.hasRequiredPermissionForRestaurant(
      currentUser.id,
      restaurantId,
      UserRole.OWNER,
    );

    const deleteManager = await this.userRepository.delete({
      id: managerId,
    });

    if (!deleteManager.affected) {
      throw new InternalServerErrorException('Cannot delete manager');
    }

    return true;
  }
}
