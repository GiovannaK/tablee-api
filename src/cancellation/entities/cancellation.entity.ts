import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';

@ObjectType()
@Entity()
export class CancellationPolicy {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    nullable: true,
    type: 'decimal',
    precision: 13,
    scale: 2,
  })
  tax: number;

  @Column({
    nullable: true,
    type: 'text',
  })
  details: string;

  @Column({
    nullable: true,
    type: 'int',
  })
  limitDaysToCancel: number;

  @Field(() => Restaurant, { nullable: true })
  @OneToOne(
    () => Restaurant,
    (restaurant: Restaurant) => restaurant.cancellationPolicy,
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
