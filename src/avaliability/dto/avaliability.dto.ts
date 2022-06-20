import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { RestaurantCategory } from '../../restaurant/entities/enums/category.enum';

@InputType()
export class AvaliabilitySearch {
  @IsOptional()
  @Field()
  @IsInt()
  guests?: number;

  @IsOptional()
  @IsNotEmpty()
  category?: RestaurantCategory;

  @IsOptional()
  @IsNotEmpty()
  date?: string;

  @IsOptional()
  @IsNotEmpty()
  hour?: string;
}
