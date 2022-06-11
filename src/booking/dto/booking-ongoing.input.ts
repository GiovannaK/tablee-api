import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsUUID, Length } from 'class-validator';

@InputType()
export class BookingOngoingInput {
  @Field()
  @IsString()
  @Length(6, 6)
  code: string;

  @Field()
  @IsUUID()
  bookingId: string;
}
