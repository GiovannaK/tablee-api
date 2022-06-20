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
export class UpdateRestaurantInput {
  @IsOptional()
  @Field()
  @IsString()
  @Length(1, 200)
  name?: string;

  @IsOptional()
  @Field()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Field()
  @Length(14)
  cnpj?: string;

  @IsOptional()
  @Field()
  @IsInt()
  maxGuestQuantity?: number;

  @IsOptional()
  @Field()
  @Length(10, 11)
  mainPhone?: string;

  @IsOptional()
  @IsOptional()
  @Field({ nullable: true })
  @Length(10, 11)
  secondaryPhone?: string;

  @IsOptional()
  @IsNotEmpty()
  category?: RestaurantCategory;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isWifi?: boolean;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isParking?: boolean;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isOpen?: boolean;

  @IsOptional()
  @IsNotEmpty()
  start_hour?: string;

  @IsOptional()
  @IsNotEmpty()
  end_hour?: string;

  @IsOptional()
  @IsNotEmpty()
  weekend_start_hour?: string;

  @IsOptional()
  @IsNotEmpty()
  weekend_end_hour?: string;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  capacity?: number;

  @IsOptional()
  brunch_start_hour?: string;

  @IsOptional()
  brunch_end_hour?: string;

  @IsOptional()
  lunch_start_hour?: string;

  @IsOptional()
  lunch_end_hour?: string;

  @IsOptional()
  dinner_start_hour?: string;

  @IsOptional()
  dinner_end_hour?: string;

  @IsOptional()
  brunch_start_hour_weekend?: string;

  @IsOptional()
  brunch_end_hour_weekend?: string;

  @IsOptional()
  lunch_start_hour_weekend?: string;

  @IsOptional()
  lunch_end_hour_weekend?: string;

  @IsOptional()
  dinner_start_hour_weekend?: string;

  @IsOptional()
  dinner_end_hour_weekend?: string;

  @IsOptional()
  @IsNotEmpty()
  isAvailableForBrunch?: boolean;

  @IsOptional()
  @IsNotEmpty()
  isAvailableForLunch?: boolean;

  @IsOptional()
  @IsNotEmpty()
  isAvailableForDinner?: boolean;
}
