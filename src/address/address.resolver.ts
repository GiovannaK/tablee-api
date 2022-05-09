import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AddressService } from './address.service';
import { CurrentUser } from '../user/decorators/currentUser.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/userRoles.decorator';
import { UserRole } from '../user/entities/role/userRole';
import { Address } from './entities/address.entity';
import { CreateAddressInput } from './dto/create-address.input';
import { User } from '../user/entities/user.entity';
import { AddressWithRestaurant } from './dto/address-restaurant';
import { UpdateAddressInput } from './dto/update-address.input';

@Resolver()
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Roles(UserRole.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => AddressWithRestaurant)
  async createAddress(
    @Args('data') data: CreateAddressInput,
    @CurrentUser() currentUser: User,
  ) {
    const address = await this.addressService.createAddressForRestaurant(
      currentUser,
      data,
    );

    return address;
  }

  @Roles(UserRole.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Address)
  async updateAddress(
    @Args('data') data: UpdateAddressInput,
    @CurrentUser() currentUser: User,
  ) {
    const address = await this.addressService.updateAddress(currentUser, data);

    return address;
  }
}
