import { Test, TestingModule } from '@nestjs/testing';
import { AvaliabilityService } from './avaliability.service';

describe('AvaliabilityService', () => {
  let service: AvaliabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvaliabilityService],
    }).compile();

    service = module.get<AvaliabilityService>(AvaliabilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
