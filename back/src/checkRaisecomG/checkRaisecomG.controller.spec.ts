import { Test, TestingModule } from '@nestjs/testing';
import { CheckRaisecomGController } from './checkRaisecomG.controller';

describe('SnmpController', () => {
  let controller: CheckRaisecomGController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckRaisecomGController],
    }).compile();

    controller = module.get<CheckRaisecomGController>(CheckRaisecomGController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
