import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { SpecialDatePortuguese } from './enums/specialDate.enum';
import { BookingStatusPortuguese } from './enums/bookingStatus.enum';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { Table } from '../../table/entities/table.entity';
import { Review } from '../../review/entities/review.entity';
import { TableCategoryPortuguese } from 'src/table/entities/enums/tableCategory.enum';
import { BookingOrderCancellation } from '../../cancellationorder/entities/cancellationOrder.entity';
import { WaitList } from 'src/waitlist/entities/waitList.entity';

@ObjectType()
@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    nullable: false,
  })
  date: string;

  @Column({ type: 'time', nullable: false })
  hour: string;

  @Column({
    nullable: false,
    type: 'integer',
  })
  partyFor: number;

  @Column({
    length: 5000,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  extras: string;

  @Column({
    nullable: false,
    default: false,
  })
  isCancelledByUser: boolean;

  @Column({
    nullable: false,
    default: false,
  })
  isCancelledByRestaurant: boolean;

  @Column({
    nullable: false,
    default: false,
  })
  isConfirmed: boolean;

  @Column({
    nullable: false,
    default: false,
  })
  hasArrived: boolean;

  @Column({
    nullable: true,
    length: 8,
  })
  code: string;

  @Column({
    type: 'enum',
    enum: SpecialDatePortuguese,
    nullable: true,
  })
  @Field(() => SpecialDatePortuguese, { nullable: true })
  specialDate: SpecialDatePortuguese;

  @Column({
    type: 'enum',
    enum: BookingStatusPortuguese,
    default: BookingStatusPortuguese.PENDENTE,
  })
  @Field(() => BookingStatusPortuguese)
  bookingStatus: BookingStatusPortuguese;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user: User) => user.booking, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Field(() => WaitList, { nullable: true })
  @ManyToOne(() => WaitList, (waitList: WaitList) => waitList.booking, {
    onDelete: 'CASCADE',
  })
  waitList: WaitList;

  @Field(() => Restaurant, { nullable: true })
  @ManyToOne(() => Restaurant, (restaurant: Restaurant) => restaurant.booking, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @Field(() => [Table], { nullable: true })
  @OneToMany(() => Table, (table: Table) => table.booking, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  table: Table[];

  @Field(() => Review, { nullable: true })
  @OneToOne(() => Review, (review: Review) => review.booking, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  review: Review;

  @Field(() => BookingOrderCancellation, { nullable: true })
  @OneToOne(() => BookingOrderCancellation, { cascade: true })
  @JoinColumn()
  bookingOrderCancellation: BookingOrderCancellation;

  @Column('enum', {
    array: true,
    enum: TableCategoryPortuguese,
    nullable: true,
  })
  @Field(() => [TableCategoryPortuguese])
  tableCategoryPreferences: TableCategoryPortuguese[];

  @Column({
    nullable: false,
    default: false,
  })
  createdByWaitList: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
