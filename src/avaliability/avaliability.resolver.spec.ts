import { Test, TestingModule } from '@nestjs/testing';
import { AvaliabilityResolver } from './avaliability.resolver';

describe('AvaliabilityResolver', () => {
  let resolver: AvaliabilityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvaliabilityResolver],
    }).compile();

    resolver = module.get<AvaliabilityResolver>(AvaliabilityResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
