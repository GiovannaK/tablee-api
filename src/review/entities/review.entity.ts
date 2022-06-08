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
import { User } from '../../user/entities/user.entity';

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

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user: User) => user.review, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Field(() => Booking, { nullable: true })
  @OneToOne(() => Booking, { cascade: true })
  @JoinColumn()
  booking: Booking;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
