import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableResolver } from './table.resolver';

@Module({
  providers: [TableService, TableResolver]
})
export class TableModule {}
