import { registerEnumType } from '@nestjs/graphql';

export enum MenuItemCategoryPortuguese {
  BEBIDA = 'BEBIDA',
  PRATOPRINCIPAL = 'PRATO PRINCIPAL',
  SOBREMESA = 'SOBREMESA',
  ENTRADA = 'ENTRADA',
}

registerEnumType(MenuItemCategoryPortuguese, {
  name: 'MenuItemCategoryPortuguese',
});
