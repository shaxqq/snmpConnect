import { Module } from '@nestjs/common';
import { CheckFoxGateController } from './checkFoxGate.controller';
import { CheckFoxGateService } from './checkFoxGate.service';

@Module({
  imports: [],
  controllers: [CheckFoxGateController],
  providers: [CheckFoxGateService],
})
export class SnmpModule {}


