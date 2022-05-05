import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { CurrentUser } from '../user/decorators/currentUser.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/userRoles.decorator';
import { UserRole } from '../user/entities/role/userRole';
import { User } from '../user/entities/user.entity';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UseGuards } from '@nestjs/common';
import { UpdateEmployeeInput } from './dto/update-employee.input';

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => [User])
  async listEmployeesByRestaurant(@Args('restaurantId') restaurantId: string) {
    const employees = await this.employeeService.listEmployeesByRestaurant(
      restaurantId,
    );
    return employees;
  }

  @Roles(UserRole.OWNER, UserRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Boolean)
  async deleteEmployee(
    @Args('restaurantId') restaurantId: string,
    @Args('employeeId') employeeId: string,
    @CurrentUser() currentUser: User,
  ) {
    const employee = await this.employeeService.deleteEmployee(
      employeeId,
      restaurantId,
      currentUser,
    );
    return employee;
  }

  @Roles(UserRole.OWNER, UserRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => User)
  async updateEmployee(
    @Args('data') data: UpdateEmployeeInput,
    @CurrentUser() currentUser: User,
  ) {
    const employee = await this.employeeService.updateEmployee(
      currentUser,
      data,
      data.restaurantId,
      data.id,
    );
    return employee;
  }
}
