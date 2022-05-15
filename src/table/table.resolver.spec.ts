import { Test, TestingModule } from '@nestjs/testing';
import { TableResolver } from './table.resolver';

describe('TableResolver', () => {
  let resolver: TableResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableResolver],
    }).compile();

    resolver = module.get<TableResolver>(TableResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
