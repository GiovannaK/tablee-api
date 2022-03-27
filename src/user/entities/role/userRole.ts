import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  USER = 'USER',
  OWNER = 'OWNER',
  EMPLOYEE = 'EMPLOYEE',
  MANAGER = 'MANAGER',
}

registerEnumType(UserRole, { name: 'UserRole' });
