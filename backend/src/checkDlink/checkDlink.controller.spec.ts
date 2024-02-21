import { Test, TestingModule } from '@nestjs/testing';
import { CheckDlinkController } from './checkDlink.controller';

describe('SnmpController', () => {
  let controller: CheckDlinkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckDlinkController],
    }).compile();

    controller = module.get<CheckDlinkController>(CheckDlinkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
