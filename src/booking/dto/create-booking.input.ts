import { Field, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { SpecialDatePortuguese } from '../entities/enums/specialDate.enum';

@InputType()
export class CreateBookingInput {
  @Field()
  @IsString()
  date: string;

  @Field()
  @IsString()
  hour: string;

  @IsOptional()
  @Field()
  @IsString()
  @Length(1, 5000)
  extras?: string;

  @Field()
  @IsUUID()
  restaurantId: string;

  @Field()
  @IsInt()
  partyFor: number;

  @IsOptional()
  @Field()
  specialDate?: SpecialDatePortuguese;
}
