/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantService } from '../restaurant/restaurant.service';
import { Repository } from 'typeorm';
import { CancellationPolicy } from './entities/cancellation.entity';
import { CreatePolicyInput } from './dto/create-policy.input';
import { PermissionService } from '../permission/permission.service';
import { UserRole } from '../user/entities/role/userRole';
import { User } from '../user/entities/user.entity';
import { UpdatePolicyInput } from './dto/update-policy.input';

@Injectable()
export class CancellationService {
  constructor(
    @InjectRepository(CancellationPolicy)
    private readonly cancellationPolicyRepository: Repository<CancellationPolicy>,
    private readonly restaurantService: RestaurantService,
    private readonly permissionService: PermissionService,
  ) {}

  async createCancellationPolicy(
    createPolicyInput: CreatePolicyInput,
    currentUser: User,
  ) {
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      createPolicyInput.restaurantId,
      [UserRole.MANAGER, UserRole.OWNER],
    );

    const restaurant =
      await this.restaurantService.getRestaurantByIdNoRelations(
        createPolicyInput.restaurantId,
      );

    const cancellationPolicy = await this.cancellationPolicyRepository.create({
      ...createPolicyInput,
      restaurant,
    });

    const createdPolicy = await this.cancellationPolicyRepository.save(
      cancellationPolicy,
    );

    if (!createdPolicy) {
      throw new InternalServerErrorException('Cancellation policy not created');
    }

    return cancellationPolicy;
  }

  async updateCancellationPolicy(
    updatePolicyInput: UpdatePolicyInput,
    currentUser: User,
  ) {
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      updatePolicyInput.restaurantId,
      [UserRole.MANAGER, UserRole.OWNER],
    );

    const isPolicyExist = await this.findCancellationPolicyById(
      updatePolicyInput.id,
    );

    const { restaurantId, ...policyProperties } = updatePolicyInput;
    const updatePolicy = await this.cancellationPolicyRepository
      .createQueryBuilder()
      .update(CancellationPolicy)
      .set({
        ...policyProperties,
      })
      .where('id = :id', { id: isPolicyExist.id })
      .updateEntity(true)
      .returning('*')
      .execute();

    if (!updatePolicy.affected) {
      throw new InternalServerErrorException('Cancellation policy not updated');
    }

    return updatePolicy.raw[0];
  }

  async findCancellationPolicyById(id: string) {
    const cancellationPolicy = await this.cancellationPolicyRepository.findOne({
      id,
    });

    if (!cancellationPolicy) {
      throw new InternalServerErrorException('Cancellation policy not found');
    }

    return cancellationPolicy;
  }

  async findCancellationPolicyByRestaurantId(restaurantId: string) {
    const cancellationPolicy = await this.cancellationPolicyRepository
      .createQueryBuilder('policy')
      .innerJoinAndSelect('policy.restaurant', 'restaurant')
      .where('restaurant.id = :restaurantId', { restaurantId })
      .getOne();

    if (!cancellationPolicy) {
      throw new InternalServerErrorException('Cancellation policy not found');
    }

    return cancellationPolicy;
  }
}
