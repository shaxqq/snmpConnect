import { Test, TestingModule } from '@nestjs/testing';
import { CheckLinksysController } from './checkLinksys.controller';

describe('SnmpController', () => {
  let controller: CheckLinksysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckLinksysController],
    }).compile();

    controller = module.get<CheckLinksysController>(CheckLinksysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
