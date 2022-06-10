import { registerEnumType } from '@nestjs/graphql';

export enum BookingStatusPortuguese {
  PENDENTE = 'PENDENTE',
  APROVADA = 'APROVADA',
  REJEITADA = 'REJEITADA',
  FINALIZADA = 'FINALIZADA',
  CANCELADA = 'CANCELADA',
  TRANSCORRENDO = 'TRANSCORRENDO',
}

registerEnumType(BookingStatusPortuguese, { name: 'BookingStatusPortuguese' });
