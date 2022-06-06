import { Test, TestingModule } from '@nestjs/testing';
import { CancellationService } from './cancellation.service';

describe('CancellationService', () => {
  let service: CancellationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CancellationService],
    }).compile();

    service = module.get<CancellationService>(CancellationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
