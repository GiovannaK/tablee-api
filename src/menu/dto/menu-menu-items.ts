import { Field, ObjectType } from '@nestjs/graphql';
import { Menu } from '../entities/menu.entity';
import { MenuItem } from '../entities/menuItem.entity';

@ObjectType()
export class MenuMenuItems {
  @Field(() => [MenuItem])
  menuItem: MenuItem[];

  @Field(() => Menu)
  menu: Menu;
}
