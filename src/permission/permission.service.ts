import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from '../restaurant/entities/restaurant.entity';
import { Repository } from 'typeorm';
import { UserRole } from '../user/entities/role/userRole';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async hasRequiredPermissionForRestaurant(
    currentUserId: string,
    restaurantId: string,
    requiredRole: UserRole,
  ) {
    console.log(requiredRole, currentUserId, restaurantId);
    const hasPermission = await this.restaurantRepository.findOne(
      restaurantId,
      {
        relations: ['user'],
        where: {
          user: {
            id: currentUserId,
            role: requiredRole,
          },
        },
      },
    );
    console.log('perm', hasPermission);
    if (!hasPermission) {
      throw new InternalServerErrorException(
        'You do not have permission to execute this action',
      );
    }

    return hasPermission;
  }
}
