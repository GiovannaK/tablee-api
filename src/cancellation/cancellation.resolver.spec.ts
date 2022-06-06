import { Test, TestingModule } from '@nestjs/testing';
import { CancellationResolver } from './cancellation.resolver';

describe('CancellationResolver', () => {
  let resolver: CancellationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CancellationResolver],
    }).compile();

    resolver = module.get<CancellationResolver>(CancellationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
