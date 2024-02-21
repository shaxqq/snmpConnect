import { Test, TestingModule } from '@nestjs/testing';
import { CheckBdcomController } from './checkBdcom.controller';

describe('SnmpController', () => {
  let controller: CheckBdcomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckBdcomController],
    }).compile();

    controller = module.get<CheckBdcomController>(CheckBdcomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
