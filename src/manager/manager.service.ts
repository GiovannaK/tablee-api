import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from '../restaurant/entities/restaurant.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { RestaurantService } from '../restaurant/restaurant.service';
import { UserRole } from '../user/entities/role/userRole';
import { PermissionService } from '../permission/permission.service';
import { CreateManagerInput } from './dto/create-manager.input';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly restaurantService: RestaurantService,
    private readonly permissionService: PermissionService,
  ) {}

  async createManager(
    createManagerInput: CreateManagerInput,
    currentUser: User,
    id: string,
  ) {
    const getRestaurant = await this.restaurantService.getRestaurantById(id);
    console.log(getRestaurant);
    await this.permissionService.hasRequiredPermissionForRestaurant(
      currentUser.id,
      id,
      UserRole.OWNER,
    );

    const manager = await this.userRepository.create({
      ...createManagerInput,
      role: UserRole.MANAGER,
      restaurant: [getRestaurant],
    });

    const savedUser = await this.userRepository.save(manager);
    console.log(savedUser);

    if (!savedUser) {
      throw new InternalServerErrorException(
        `Cannot create manager for restaurant: ${id}`,
      );
    }

    return savedUser;
  }
}
