import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TableService } from './table.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/userRoles.decorator';
import { CurrentUser } from '../user/decorators/currentUser.decorator';
import { UserRole } from '../user/entities/role/userRole';
import { UseGuards } from '@nestjs/common';
import { Table } from './entities/table.entity';
import { CreateTableInput } from './dto/create-table.input';
import { User } from '../user/entities/user.entity';

@Resolver()
export class TableResolver {
  constructor(private readonly tableService: TableService) {}

  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Table)
  async createTable(
    @Args('data') data: CreateTableInput,
    @CurrentUser() currentUser: User,
  ) {
    const table = await this.tableService.createTable(data, currentUser);
    return table;
  }

  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => [Table])
  async createMultipleTables(
    @Args('data') data: CreateTableInput,
    @CurrentUser() currentUser: User,
    @Args('quantity') quantity: number,
    @Args('initialTableNumber') initialTableNumber: number,
  ) {
    const table = await this.tableService.createMulipleTablesInBulk(
      data,
      quantity,
      currentUser,
      initialTableNumber,
    );
    return table;
  }

  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Boolean)
  async deleteTable(
    @Args('tableId') tableId: string,
    @CurrentUser() currentUser: User,
  ) {
    const table = await this.tableService.deleteTable(tableId, currentUser);
    return table;
  }

  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Boolean)
  async deleteTablesInBulk(
    @Args({ name: 'tableIds', type: () => [String] }) tableIds: string[],
    @CurrentUser() currentUser: User,
  ) {
    const table = await this.tableService.deleteTablesInBulk(
      tableIds,
      currentUser,
    );
    return table;
  }
}
