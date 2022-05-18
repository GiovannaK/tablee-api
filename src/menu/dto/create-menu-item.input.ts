import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID, Length } from 'class-validator';
import { MenuItemCategoryPortuguese } from '../enums/menuItemCategory.enum';

@InputType()
export class CreateMenuItemInput {
  @Field()
  @IsString()
  @Length(1, 200)
  name: string;

  @Field()
  @IsString()
  @Length(1, 5000)
  description: string;

  @Field()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @Field()
  category: MenuItemCategoryPortuguese;

  @Field()
  @IsUUID()
  menuId: string;

  @Field()
  @IsUUID()
  restaurantId: string;
}
