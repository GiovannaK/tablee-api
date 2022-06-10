import { Test, TestingModule } from '@nestjs/testing';
import { BookingtableService } from './bookingtable.service';

describe('BookingtableService', () => {
  let service: BookingtableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingtableService],
    }).compile();

    service = module.get<BookingtableService>(BookingtableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
