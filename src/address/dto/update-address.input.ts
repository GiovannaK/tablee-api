import { Field, InputType } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

@InputType()
export class UpdateAddressInput {
  @Field()
  @IsUUID()
  restaurantId: string;

  @Field()
  @IsUUID()
  id: string;

  @IsOptional()
  @Field()
  @IsString()
  @Length(1, 200)
  city?: string;

  @IsOptional()
  @Field()
  @IsString()
  @Length(2, 2)
  uf?: string;

  @IsOptional()
  @Field()
  @IsString()
  @Length(8, 8)
  postalCode?: string;

  @IsOptional()
  @Field()
  @IsString()
  @Length(1, 200)
  neighborhood?: string;

  @IsOptional()
  @Field()
  @IsNotEmpty()
  street?: string;

  @IsOptional()
  @Field()
  @IsInt()
  number?: number;
}
