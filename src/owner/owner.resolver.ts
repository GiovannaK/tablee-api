import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user/entities/user.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { OwnerService } from './owner.service';

@Resolver('Owner')
export class OwnerResolver {
  constructor(private readonly ownerService: OwnerService) {}

  @Mutation(() => User)
  async createOwner(@Args('data') data: CreateOwnerInput): Promise<User> {
    const user = await this.ownerService.createOwner(data);
    return user;
  }
}
