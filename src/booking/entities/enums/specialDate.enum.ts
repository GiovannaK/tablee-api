import { registerEnumType } from '@nestjs/graphql';

export enum SpecialDatePortuguese {
  ANIVERSARIO = 'ANIVERSÁRIO',
  CELEBRACAO = 'CELEBRAÇÃO',
  REFEICAO_NEGOCIOS = 'REFEIÇÃO DE NEGÓCIOS',
  ENCONTRO = 'ENCONTRO',
}

registerEnumType(SpecialDatePortuguese, { name: 'SpecialDatePortuguese' });
