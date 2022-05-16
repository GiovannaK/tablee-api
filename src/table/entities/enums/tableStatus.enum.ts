import { registerEnumType } from '@nestjs/graphql';

export enum TableStatusPortuguese {
  DISPONIVEL = 'DISPONÍVEL',
  OCUPADA = 'OCUPADA',
  INDISPONIVEL = 'INDISPONÍVEL',
}

registerEnumType(TableStatusPortuguese, { name: 'TableStatusPortuguese' });
