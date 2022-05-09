import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

@InputType()
export class CreateAddressInput {
  @Field()
  @IsUUID()
  restaurantId: string;

  @Field()
  @IsString()
  @Length(1, 200)
  city: string;

  @Field()
  @IsString()
  @Length(2, 2)
  uf: string;

  @Field()
  @IsString()
  @Length(8, 8)
  postalCode: string;

  @Field()
  @IsString()
  @Length(1, 200)
  neighborhood: string;

  @Field()
  @IsNotEmpty()
  street: string;

  @Field()
  @IsInt()
  number: number;
}
