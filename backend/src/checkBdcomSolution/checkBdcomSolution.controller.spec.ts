import { Test, TestingModule } from '@nestjs/testing';
import { CheckBdcomSolutionController } from './checkbdcomSolution.controller';

describe('SnmpController', () => {
  let controller: CheckBdcomSolutionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckBdcomSolutionController],
    }).compile();

    controller = module.get<CheckBdcomSolutionController>(CheckBdcomSolutionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
