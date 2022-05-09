import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BrazilianStates } from './enums/state.enum';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

@ObjectType()
@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    length: 200,
    nullable: false,
  })
  city: string;

  @Column({
    length: 2,
    nullable: false,
  })
  uf: string;

  @Column({
    length: 8,
    nullable: false,
  })
  postalCode: string;

  @Column({
    length: 200,
    nullable: true,
  })
  neighborhood: string;

  @Column({
    length: 200,
    nullable: true,
  })
  street: string;

  @Column({
    nullable: false,
    type: 'integer',
  })
  number: number;

  @Column({
    type: 'enum',
    enum: BrazilianStates,
    default: BrazilianStates.SP,
  })
  @Field(() => BrazilianStates)
  state: BrazilianStates;

  @Field(() => Restaurant, { nullable: true })
  @OneToOne(() => Restaurant, (restaurant: Restaurant) => restaurant.address, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  restaurant: Restaurant;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
