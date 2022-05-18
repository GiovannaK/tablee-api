import { Field, InputType } from '@nestjs/graphql';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { MenuItemCategoryPortuguese } from '../enums/menuItemCategory.enum';

@InputType()
export class UpdateMenuItemInput {
  @IsOptional()
  @Field()
  @IsString()
  @IsUUID()
  id: string;

  @IsOptional()
  @Field()
  @IsString()
  @Length(1, 200)
  name?: string;

  @IsOptional()
  @Field()
  @IsString()
  @Length(1, 5000)
  description?: string;

  @IsOptional()
  @Field()
  @IsNumber({ maxDecimalPlaces: 2 })
  price?: number;

  @IsOptional()
  @Field()
  category?: MenuItemCategoryPortuguese;

  @Field()
  @IsUUID()
  restaurantId: string;
}
