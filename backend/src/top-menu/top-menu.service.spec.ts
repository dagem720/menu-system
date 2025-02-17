import { Test, TestingModule } from '@nestjs/testing';
import { TopMenuService } from './top-menu.service';

describe('TopMenuService', () => {
  let service: TopMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopMenuService],
    }).compile();

    service = module.get<TopMenuService>(TopMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
