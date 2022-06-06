import { Module } from '@nestjs/common';
import { CancellationorderService } from './cancellationorder.service';
import { CancellationorderResolver } from './cancellationorder.resolver';

@Module({
  providers: [CancellationorderService, CancellationorderResolver]
})
export class CancellationorderModule {}
