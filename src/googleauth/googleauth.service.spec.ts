import { Test, TestingModule } from '@nestjs/testing';
import { GoogleauthService } from './googleauth.service';

describe('GoogleauthService', () => {
  let service: GoogleauthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleauthService],
    }).compile();

    service = module.get<GoogleauthService>(GoogleauthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
