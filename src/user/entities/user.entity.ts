import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Profile } from '../../profile/entities/profile.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './role/userRole';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    length: 200,
    nullable: false,
  })
  firstName: string;

  @Column({
    length: 200,
    nullable: false,
  })
  lastName: string;

  @Column({
    length: 320,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    length: 11,
    nullable: true,
  })
  mainPhone: string;

  @Column({
    length: 11,
    nullable: true,
  })
  secondaryPhone: string;

  @Column({ default: false })
  isRegisteredWithGoogle: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @Field(() => UserRole)
  role: UserRole;

  @Column({
    nullable: true,
  })
  loginToken?: string;

  @Column({
    nullable: true,
  })
  expirationLoginToken?: string;

  @Column({
    nullable: true,
  })
  stripeCustomerId?: string;

  @Field(() => Profile, { nullable: true })
  @OneToOne(() => Profile, { cascade: true })
  @JoinColumn()
  profile: Profile;

  @Field(() => [Restaurant], { nullable: true })
  @ManyToMany(() => Restaurant, (restaurant: Restaurant) => restaurant.user, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable()
  restaurant: Restaurant[];

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
