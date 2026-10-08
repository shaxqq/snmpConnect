import { Test, TestingModule } from '@nestjs/testing';
import { CheckFoxGateController } from './checkFoxGate.controller';

describe('SnmpController', () => {
  let controller: CheckFoxGateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckFoxGateController],
    }).compile();

    controller = module.get<CheckFoxGateController>(CheckFoxGateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
