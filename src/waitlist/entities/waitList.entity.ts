import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Booking } from '../../booking/entities/booking.entity';
import {
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

@ObjectType()
@Entity()
export class WaitList {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field(() => Restaurant, { nullable: true })
  @OneToOne(() => Restaurant, (restaurant: Restaurant) => restaurant.waitlist, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @Field(() => [Booking], { nullable: true })
  @OneToMany(() => Booking, (booking: Booking) => booking.waitList, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  booking: Booking[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
