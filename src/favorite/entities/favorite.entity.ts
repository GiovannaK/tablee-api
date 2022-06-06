import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  Entity,
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
  @OneToOne(() => User, (user: User) => user.favorite, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Field(() => [Restaurant], { nullable: true })
  @OneToMany(
    () => Restaurant,
    (restaurant: Restaurant) => restaurant.favorite,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  restaurant: Restaurant[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
