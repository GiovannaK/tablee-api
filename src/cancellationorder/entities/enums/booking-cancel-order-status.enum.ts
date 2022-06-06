import { registerEnumType } from '@nestjs/graphql';

export enum BookingCancelOrder {
  processing = 'processing',
  succeeded = 'succeeded',
  amount_capturable_updated = 'amount_capturable_updated',
  payment_failed = 'payment_failed',
}

registerEnumType(BookingCancelOrder, { name: 'BookingCancelOrder' });
