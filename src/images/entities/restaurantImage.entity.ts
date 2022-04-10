import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

@ObjectType()
@Entity()
export class RestaurantImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    nullable: false,
  })
  url: string;

  @Column({
    nullable: false,
  })
  key: string;

  @Field(() => Restaurant, { nullable: true })
  @ManyToOne(
    () => Restaurant,
    (restaurant: Restaurant) => restaurant.restaurantImage,
    {
      onDelete: 'CASCADE',
    },
  )
  restaurant: Restaurant;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
