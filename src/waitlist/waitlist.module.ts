import { Module } from '@nestjs/common';
import { WaitlistService } from './waitlist.service';
import { WaitlistResolver } from './waitlist.resolver';

@Module({
  providers: [WaitlistService, WaitlistResolver]
})
export class WaitlistModule {}
