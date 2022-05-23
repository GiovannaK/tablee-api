import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { TableCategoryPortuguese } from '../entities/enums/tableCategory.enum';
import { TableStatusPortuguese } from '../entities/enums/tableStatus.enum';

@InputType()
export class CreateTableInput {
  @IsOptional()
  @Field()
  @IsNumber()
  tableNumber?: number;

  @Field()
  @IsNotEmpty()
  category: TableCategoryPortuguese;

  @Field()
  @IsNotEmpty()
  seats: 2;

  @IsOptional()
  @Field()
  @IsNotEmpty()
  status?: TableStatusPortuguese;

  @Field()
  @IsUUID()
  restaurantId: string;
}
