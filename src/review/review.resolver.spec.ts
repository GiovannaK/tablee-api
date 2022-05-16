import { Test, TestingModule } from '@nestjs/testing';
import { ReviewResolver } from './review.resolver';

describe('ReviewResolver', () => {
  let resolver: ReviewResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewResolver],
    }).compile();

    resolver = module.get<ReviewResolver>(ReviewResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
