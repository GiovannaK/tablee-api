import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { MenuItem } from './menuItem.entity';

@ObjectType()
@Entity()
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    nullable: false,
    length: 200,
  })
  title: string;

  @Field(() => Restaurant, { nullable: true })
  @ManyToOne(() => Restaurant, (restaurant: Restaurant) => restaurant.menu, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @Field(() => [MenuItem], { nullable: true })
  @OneToMany(() => MenuItem, (menuItem: MenuItem) => menuItem.menu, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  menuItem: MenuItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
