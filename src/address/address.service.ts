import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { User } from '../user/entities/user.entity';
import { CreateAddressInput } from './dto/create-address.input';
import { Restaurant } from '../restaurant/entities/restaurant.entity';
import { PermissionService } from '../permission/permission.service';
import { RestaurantService } from '../restaurant/restaurant.service';
import { UserRole } from '../user/entities/role/userRole';
import { BrazilianStates } from './entities/enums/state.enum';
import { UpdateAddressInput } from './dto/update-address.input';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    private readonly userService: UserService,
    private readonly permissionService: PermissionService,
    private readonly restaurantService: RestaurantService,
  ) {}

  async createAddressForRestaurant(
    currentUser: User,
    createAddressInput: CreateAddressInput,
  ) {
    await this.permissionService.hasRequiredPermissionForRestaurant(
      currentUser.id,
      createAddressInput.restaurantId,
      UserRole.OWNER,
    );

    const getRestaurantToCreateAddress =
      await this.restaurantService.getRestaurantByIdNoRelations(
        createAddressInput.restaurantId,
      );

    const determineStateName = BrazilianStates[createAddressInput.uf];

    const createAddress = await this.addressRepository.create({
      restaurant: {
        ...getRestaurantToCreateAddress,
      },
      state: determineStateName,
      ...createAddressInput,
    });

    const createdAddress = await this.addressRepository.save(createAddress);

    if (!createdAddress) {
      throw new InternalServerErrorException('Cannot create address');
    }

    const addressWithRestaurant = await this.getAddressWithRestaurant(
      createdAddress.id,
      getRestaurantToCreateAddress.id,
    );

    return addressWithRestaurant;
  }

  async updateAddress(
    currentUser: User,
    updateAddressInput: UpdateAddressInput,
  ) {
    await this.permissionService.hasMultiplePermissionRequiredForRestaurant(
      currentUser.id,
      updateAddressInput.restaurantId,
      [UserRole.OWNER],
    );

    delete updateAddressInput.restaurantId;
    const { id } = updateAddressInput;

    const updateAddress = await this.addressRepository
      .createQueryBuilder()
      .update('Address')
      .set({
        ...updateAddressInput,
      })
      .where('id = :id', { id })
      .updateEntity(true)
      .execute();

    if (!updateAddress) {
      throw new InternalServerErrorException('Cannot update address');
    }

    const address = await this.getAddressById(id);

    return address;
  }

  async getAddressWithRestaurant(addressId: string, restaurantId: string) {
    const address = await this.addressRepository
      .createQueryBuilder('address')
      .innerJoinAndSelect('address.restaurant', 'restaurant')
      .where('restaurant.id = :restaurantId', { restaurantId })
      .andWhere('address.id = :addressId', { addressId })
      .getOneOrFail();

    if (!address) {
      throw new InternalServerErrorException('Cannot find address');
    }

    return address;
  }

  async getAddressById(id: string) {
    const address = await this.addressRepository.findOne(id);
    if (!address) {
      throw new InternalServerErrorException('Cannot find address');
    }

    return address;
  }
}
