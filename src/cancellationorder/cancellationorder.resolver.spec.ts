import { Test, TestingModule } from '@nestjs/testing';
import { CancellationorderResolver } from './cancellationorder.resolver';

describe('CancellationorderResolver', () => {
  let resolver: CancellationorderResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CancellationorderResolver],
    }).compile();

    resolver = module.get<CancellationorderResolver>(CancellationorderResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
