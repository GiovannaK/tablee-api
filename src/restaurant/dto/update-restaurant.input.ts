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
}
