import { registerEnumType } from '@nestjs/graphql';

export enum BookingStatusPortuguese {
  PENDENTE = 'PENDENTE',
  APROVADA = 'APROVADA',
  REJEITADA = 'REJEITADA',
}

registerEnumType(BookingStatusPortuguese, { name: 'BookingStatusPortuguese' });
