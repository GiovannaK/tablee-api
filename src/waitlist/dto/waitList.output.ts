import { Field, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { Booking } from '../../booking/entities/booking.entity';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

@ObjectType()
export class WaitListOutput {
  @IsOptional()
  @Field(() => [Booking])
  booking?: Booking;

  @IsOptional()
  @Field(() => Restaurant)
  restaurant?: Restaurant;

  @Field(() => String)
  id: string;
}
