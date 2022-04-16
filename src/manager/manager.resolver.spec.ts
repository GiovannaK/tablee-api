import { Test, TestingModule } from '@nestjs/testing';
import { ManagerResolver } from './manager.resolver';

describe('ManagerResolver', () => {
  let resolver: ManagerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerResolver],
    }).compile();

    resolver = module.get<ManagerResolver>(ManagerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
