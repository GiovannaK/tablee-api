import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from '../restaurant/entities/restaurant.entity';
import { Repository } from 'typeorm';
import { UserRole } from '../user/entities/role/userRole';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async hasRequiredPermissionForRestaurant(
    currentUserId: string,
    restaurantId: string,
    requiredRole: UserRole,
  ) {
    const hasPermission = await this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.restaurant', 'restaurant')
      .where('restaurant.id = :restaurantId', { restaurantId })
      .andWhere('user.id = :currentUserId', { currentUserId })
      .andWhere('user.role = :requiredRole', { requiredRole })
      .getOneOrFail();

    if (!hasPermission) {
      throw new InternalServerErrorException(
        'You do not have permission to execute this action',
      );
    }

    return hasPermission;
  }
}
