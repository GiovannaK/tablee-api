import { registerEnumType } from '@nestjs/graphql';

export enum PaymentTypesPortuguese {
  MASTERCARD = 'MASTERCARD',
  VISA = 'VISA',
  DISCOVER = 'DISCOVER',
  AMEX = 'AMEX',
  MONEY = 'DINHEIRO',
}

registerEnumType(PaymentTypesPortuguese, { name: 'PaymentTypesPortuguese' });
