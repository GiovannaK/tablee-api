import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { CreateUserInput } from './dto/create-user.Input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CurrentUser } from './decorators/currentUser.decorator';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    const user = await this.userService.createUser(data);
    return user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => User)
  async getCurrentUser(@CurrentUser() currentUser: User): Promise<User> {
    const user = await this.userService.getUserById(currentUser.id);
    return user;
  }
}
