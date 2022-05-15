import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuResolver } from './menu.resolver';

@Module({
  providers: [MenuService, MenuResolver]
})
export class MenuModule {}
