import { Test, TestingModule } from '@nestjs/testing';
import { CheckZteController } from './checkZte.controller';

describe('SnmpController', () => {
  let controller: CheckZteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckZteController],
    }).compile();

    controller = module.get<CheckZteController>(CheckZteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
