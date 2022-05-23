import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { TableCategoryPortuguese } from '../entities/enums/tableCategory.enum';
import { TableStatusPortuguese } from '../entities/enums/tableStatus.enum';

@InputType()
export class CreateTableInput {
  @IsOptional()
  @Field()
  @IsInt()
  tableNumber?: number;

  @Field()
  @IsNotEmpty()
  category: TableCategoryPortuguese;

  @Field()
  @IsNotEmpty()
  @IsInt()
  seats: 2;

  @IsOptional()
  @Field()
  @IsNotEmpty()
  status?: TableStatusPortuguese;

  @Field()
  @IsUUID()
  restaurantId: string;
}
