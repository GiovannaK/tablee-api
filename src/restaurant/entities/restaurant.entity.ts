import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RestaurantImage } from '../../images/entities/restaurantImage.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { RestaurantCategory } from './enums/category.enum';
import { Address } from '../../address/entities/address.entity';
import { Menu } from '../../menu/entities/menu.entity';

@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    length: 200,
    nullable: false,
  })
  name: string;

  @Column({
    length: 14,
    nullable: false,
  })
  cnpj: string;

  @Column({
    length: 320,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    length: 11,
    nullable: false,
  })
  mainPhone: string;

  @Column({
    length: 11,
    nullable: true,
  })
  secondaryPhone?: string;

  @Column({
    type: 'enum',
    enum: RestaurantCategory,
    default: RestaurantCategory.BRASILEIRO,
  })
  @Field(() => RestaurantCategory)
  category: RestaurantCategory;

  @Column({ default: false })
  isWifi: boolean;

  @Column({ default: false })
  isParking: boolean;

  @Column({ default: false })
  isOpen: boolean;

  @Column({ type: 'time', nullable: false })
  start_hour: string;

  @Column({ type: 'time', nullable: false })
  end_hour: string;

  @Column({ type: 'time', nullable: false })
  weekend_start_hour: string;

  @Column({ type: 'time', nullable: false })
  weekend_end_hour: string;

  @Column({ type: 'integer', nullable: false })
  capacity: number;

  @Column({
    nullable: true,
  })
  stripeAccountId?: string;

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user: User) => user.restaurant, {
    onDelete: 'CASCADE',
  })
  user: User[];

  @Field(() => [RestaurantImage], { nullable: true })
  @OneToMany(
    () => RestaurantImage,
    (restaurantImage: RestaurantImage) => restaurantImage.restaurant,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  restaurantImage: RestaurantImage[];

  @Field(() => [Menu], { nullable: true })
  @OneToMany(() => Menu, (menu: Menu) => menu.restaurant, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  menu: Menu[];

  @Field(() => Address, { nullable: true })
  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  address: Address;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
