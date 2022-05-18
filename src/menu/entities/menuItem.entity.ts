import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MenuItemCategoryPortuguese } from '../enums/menuItemCategory.enum';
import { Menu } from './menu.entity';

@ObjectType()
@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    nullable: false,
    length: 200,
  })
  name: string;

  @Column({
    nullable: false,
    length: 5000,
  })
  description: string;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 13,
    scale: 2,
  })
  price: number;

  @Field(() => Menu, { nullable: true })
  @ManyToOne(() => Menu, (menu: Menu) => menu.menuItem, {
    onDelete: 'CASCADE',
  })
  menu: Menu;

  @Column({
    type: 'enum',
    enum: MenuItemCategoryPortuguese,
    default: MenuItemCategoryPortuguese.BEBIDA,
  })
  @Field(() => MenuItemCategoryPortuguese)
  category: MenuItemCategoryPortuguese;

  @Column({
    nullable: true,
  })
  url: string;

  @Column({
    nullable: true,
  })
  key: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
