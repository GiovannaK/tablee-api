import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuResolver } from './menu.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { FileModule } from '../file/file.module';
import { PermissionModule } from '../permission/permission.module';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { MenuItem } from './entities/menuItem.entity';

@Module({
  providers: [MenuService, MenuResolver],
  exports: [MenuService],
  imports: [
    TypeOrmModule.forFeature([Menu, MenuItem]),
    FileModule,
    PermissionModule,
    RestaurantModule,
  ],
})
export class MenuModule {}
