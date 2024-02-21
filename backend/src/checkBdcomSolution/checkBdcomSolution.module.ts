import { Module } from '@nestjs/common';
import { CheckBdcomSolutionController } from './checkBdcomSolution.controller';
import { CheckBdcomSolutionService } from './checkBdcomSolution.service';

@Module({
  imports: [],
  controllers: [CheckBdcomSolutionController],
  providers: [CheckBdcomSolutionService],
})
export class SnmpModule {}


