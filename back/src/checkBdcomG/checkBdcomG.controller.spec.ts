import { Test, TestingModule } from '@nestjs/testing';
import { CheckBdcomGController } from './checkBdcomG.controller';

describe('SnmpController', () => {
  let controller: CheckBdcomGController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckBdcomGController],
    }).compile();

    controller = module.get<CheckBdcomGController>(CheckBdcomGController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
