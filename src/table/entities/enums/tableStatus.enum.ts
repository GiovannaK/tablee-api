import { registerEnumType } from '@nestjs/graphql';

export enum TableStatusPortuguese {
  DISPONIVEL = 'DISPONÍVEL',
  OCUPADA = 'OCUPADA',
  INDISPONÍVEL = 'INDISPONÍVEL',
}

registerEnumType(TableStatusPortuguese, { name: 'TableStatusPortuguese' });
