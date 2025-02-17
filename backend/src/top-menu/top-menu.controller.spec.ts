import { Test, TestingModule } from '@nestjs/testing';
import { TopMenuController } from './top-menu.controller';

describe('TopMenuController', () => {
  let controller: TopMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopMenuController],
    }).compile();

    controller = module.get<TopMenuController>(TopMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
