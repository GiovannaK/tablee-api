import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { CurrentUser } from '../user/decorators/currentUser.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/userRoles.decorator';
import { UserRole } from '../user/entities/role/userRole';
import { User } from '../user/entities/user.entity';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => User)
  async createEmployee(
    @Args('data') data: CreateEmployeeInput,
    @CurrentUser() currentUser: User,
  ) {
    const employee = await this.employeeService.createEmployee(
      data,
      currentUser,
      data.restaurantId,
    );
    return employee;
  }
}
