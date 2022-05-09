import { Field, ObjectType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';

@ObjectType()
export class AddressWithRestaurant {
  @Field()
  @IsUUID()
  restaurantId: string;

  @Field(() => Restaurant)
  restaurant: Restaurant;

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
