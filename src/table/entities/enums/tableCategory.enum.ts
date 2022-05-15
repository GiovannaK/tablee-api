import { registerEnumType } from '@nestjs/graphql';

export enum TableCategoryPortuguese {
  INTERNA = 'INTERNA',
  EXTERNA = 'EXTERNA',
  BAR = 'BAR',
}

registerEnumType(TableCategoryPortuguese, { name: 'TableCategoryPortuguese' });
