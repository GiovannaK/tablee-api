import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Booking } from '../../booking/entities/booking.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

@ObjectType()
@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    nullable: false,
    type: 'integer',
  })
  rating: number;

  @Column({
    length: 2000,
    nullable: false,
  })
  comment: string;

  @Field(() => Restaurant, { nullable: true })
  @ManyToOne(() => Restaurant, (restaurant: Restaurant) => restaurant.booking, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @Field(() => Booking, { nullable: true })
  @OneToOne(() => Booking, { cascade: true })
  @JoinColumn()
  booking: Booking;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
