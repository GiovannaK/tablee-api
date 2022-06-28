import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user: User) => user.favorite, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Field(() => Restaurant, { nullable: true })
  @ManyToOne(
    () => Restaurant,
    (restaurant: Restaurant) => restaurant.favorite,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  restaurant: Restaurant;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
