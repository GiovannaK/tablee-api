import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Booking } from '../../booking/entities/booking.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { TableCategoryPortuguese } from './enums/tableCategory.enum';
import { TableStatusPortuguese } from './enums/tableStatus.enum';

@ObjectType()
@Entity()
export class Table {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    nullable: false,
    type: 'integer',
  })
  tableNumber: number;

  @Column({
    type: 'enum',
    enum: TableCategoryPortuguese,
    default: TableCategoryPortuguese.INTERNA,
  })
  @Field(() => TableCategoryPortuguese)
  category: TableCategoryPortuguese;

  @Column({
    type: 'enum',
    enum: TableStatusPortuguese,
    default: TableStatusPortuguese.DISPONIVEL,
  })
  @Field(() => TableStatusPortuguese)
  status: TableStatusPortuguese;

  @Field(() => Booking, { nullable: true })
  @ManyToOne(() => Booking, (booking: Booking) => booking.table, {
    onDelete: 'CASCADE',
  })
  booking: Booking;

  @Field(() => Restaurant, { nullable: true })
  @ManyToOne(() => Restaurant, (restaurant: Restaurant) => restaurant.booking, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
