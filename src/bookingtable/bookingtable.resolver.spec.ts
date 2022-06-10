import { Test, TestingModule } from '@nestjs/testing';
import { BookingtableResolver } from './bookingtable.resolver';

describe('BookingtableResolver', () => {
  let resolver: BookingtableResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingtableResolver],
    }).compile();

    resolver = module.get<BookingtableResolver>(BookingtableResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
