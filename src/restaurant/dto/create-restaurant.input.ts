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
import { RestaurantCategory } from '../entities/enums/category.enum';

@InputType()
export class CreateRestaurantInput {
  @Field()
  @IsString()
  @Length(1, 200)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(14)
  cnpj: string;

  @Field()
  @Length(10, 11)
  mainPhone: string;

  @IsOptional()
  @Field({ nullable: true })
  @Length(10, 11)
  secondaryPhone?: string;

  @IsNotEmpty()
  category: RestaurantCategory;

  @IsInt()
  @IsNotEmpty()
  maxGuestQuantity: number;

  @IsBoolean()
  @IsNotEmpty()
  isWifi: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isParking: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isOpen: boolean;

  @IsNotEmpty()
  start_hour: string;

  @IsNotEmpty()
  end_hour: string;

  @IsNotEmpty()
  weekend_start_hour: string;

  @IsNotEmpty()
  weekend_end_hour: string;

  @IsInt()
  @IsNotEmpty()
  capacity: number;

  @IsOptional()
  brunch_start_hour: string;

  @IsOptional()
  brunch_end_hour: string;

  @IsOptional()
  lunch_start_hour: string;

  @IsOptional()
  lunch_end_hour: string;

  @IsOptional()
  dinner_start_hour: string;

  @IsOptional()
  dinner_end_hour: string;

  @IsOptional()
  brunch_start_hour_weekend: string;

  @IsOptional()
  brunch_end_hour_weekend: string;

  @IsOptional()
  lunch_start_hour_weekend: string;

  @IsOptional()
  lunch_end_hour_weekend: string;

  @IsOptional()
  dinner_start_hour_weekend: string;

  @IsOptional()
  dinner_end_hour_weekend: string;

  @IsNotEmpty()
  isAvailableForBrunch: boolean;

  @IsNotEmpty()
  isAvailableForLunch: boolean;

  @IsNotEmpty()
  isAvailableForDinner: boolean;
}
