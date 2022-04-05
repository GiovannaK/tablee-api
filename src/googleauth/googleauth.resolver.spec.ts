import { Test, TestingModule } from '@nestjs/testing';
import { GoogleauthResolver } from './googleauth.resolver';

describe('GoogleauthResolver', () => {
  let resolver: GoogleauthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleauthResolver],
    }).compile();

    resolver = module.get<GoogleauthResolver>(GoogleauthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
