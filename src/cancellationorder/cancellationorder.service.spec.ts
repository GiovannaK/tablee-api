import { Test, TestingModule } from '@nestjs/testing';
import { CancellationorderService } from './cancellationorder.service';

describe('CancellationorderService', () => {
  let service: CancellationorderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CancellationorderService],
    }).compile();

    service = module.get<CancellationorderService>(CancellationorderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
