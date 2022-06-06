import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Booking } from 'src/booking/entities/booking.entity';
import { BookingCancelOrder } from './enums/booking-cancel-order-status.enum';

@ObjectType()
@Entity()
export class BookingOrderCancellation {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    nullable: true,
    type: 'decimal',
    precision: 13,
    scale: 2,
  })
  price: number;

  @Column({
    type: 'enum',
    enum: BookingCancelOrder,
    default: BookingCancelOrder.processing,
  })
  @Field(() => BookingCancelOrder)
  bookingCancelStatus: BookingCancelOrder;

  @Field(() => Booking, { nullable: true })
  @OneToOne(
    () => Booking,
    (booking: Booking) => booking.bookingOrderCancellation,
    {
      onDelete: 'CASCADE',
    },
  )
  booking: Booking;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
