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
}
