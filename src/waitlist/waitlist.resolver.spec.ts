import { Test, TestingModule } from '@nestjs/testing';
import { WaitlistResolver } from './waitlist.resolver';

describe('WaitlistResolver', () => {
  let resolver: WaitlistResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaitlistResolver],
    }).compile();

    resolver = module.get<WaitlistResolver>(WaitlistResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
