import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RestaurantImage } from '../../images/entities/restaurantImage.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { RestaurantCategory } from './enums/category.enum';
import { Address } from '../../address/entities/address.entity';
import { Menu } from '../../menu/entities/menu.entity';
import { Booking } from '../../booking/entities/booking.entity';
import { DressCodePortuguese } from './enums/dressCode.enum';
import { PaymentTypesPortuguese } from './enums/payment.enum';
import { Review } from '../../review/entities/review.entity';
import { CancellationPolicy } from 'src/cancellation/entities/cancellation.entity';
import { WaitList } from '../../waitlist/entities/waitList.entity';
import { Favorite } from '../../favorite/entities/favorite.entity';

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

  @Column({
    type: 'enum',
    enum: DressCodePortuguese,
    default: DressCodePortuguese.CASUAL,
  })
  @Field(() => DressCodePortuguese)
  dressCode: DressCodePortuguese;

  @Column('enum', {
    array: true,
    enum: PaymentTypesPortuguese,
    default: [PaymentTypesPortuguese.MONEY],
  })
  @Field(() => [PaymentTypesPortuguese])
  acceptedPaymentMethods: PaymentTypesPortuguese[];

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

  @Column({ type: 'time', nullable: true })
  brunch_start_hour: string;

  @Column({ type: 'time', nullable: true })
  brunch_end_hour: string;

  @Column({ type: 'time', nullable: true })
  lunch_start_hour: string;

  @Column({ type: 'time', nullable: true })
  lunch_end_hour: string;

  @Column({ type: 'time', nullable: true })
  dinner_start_hour: string;

  @Column({ type: 'time', nullable: true })
  dinner_end_hour: string;

  @Column({ default: true })
  isAvailableForBrunch: boolean;

  @Column({ default: true })
  isAvailableForLunch: boolean;

  @Column({ default: true })
  isAvailableForDinner: boolean;

  @Column({
    nullable: true,
  })
  stripeAccountId?: string;

  @Column({
    nullable: true,
  })
  thumbUrl: string;

  @Column({
    nullable: true,
  })
  thumbKey: string;

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user: User) => user.restaurant, {
    onDelete: 'CASCADE',
  })
  user: User[];

  @Field(() => WaitList, { nullable: true })
  @OneToOne(() => WaitList, { cascade: true })
  @JoinColumn()
  waitlist: WaitList;

  @Field(() => Favorite, { nullable: true })
  @ManyToOne(() => Favorite, (favorite: Favorite) => favorite.restaurant, {
    onDelete: 'CASCADE',
  })
  favorite: Favorite;

  @Field(() => CancellationPolicy, { nullable: true })
  @OneToOne(() => CancellationPolicy, { cascade: true })
  @JoinColumn()
  cancellationPolicy: CancellationPolicy;

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

  @Field(() => [Booking], { nullable: true })
  @OneToMany(() => Booking, (booking: Booking) => booking.restaurant, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  booking: Booking[];

  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, (review: Review) => review.restaurant, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  review: Review[];

  @Field(() => Address, { nullable: true })
  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  address: Address;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
