import { Module } from '@nestjs/common';
import { CancellationService } from './cancellation.service';
import { CancellationResolver } from './cancellation.resolver';

@Module({
  providers: [CancellationService, CancellationResolver]
})
export class CancellationModule {}
