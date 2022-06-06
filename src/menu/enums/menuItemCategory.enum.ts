import { registerEnumType } from '@nestjs/graphql';

export enum MenuItemCategoryPortuguese {
  BEBIDA_ALCOOLICA = 'BEBIDA ALCOÓLICA',
  BEBIDA_SEM_ALCOOL = 'BEBIDA SEM ÁLCOOL',
  PRATOPRINCIPAL = 'PRATO PRINCIPAL',
  SOBREMESA = 'SOBREMESA',
  ENTRADA = 'ENTRADA',
}

registerEnumType(MenuItemCategoryPortuguese, {
  name: 'MenuItemCategoryPortuguese',
});
