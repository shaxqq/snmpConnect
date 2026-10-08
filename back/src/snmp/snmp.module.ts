import { Module } from '@nestjs/common';
import { SnmpController } from './snmp.controller';
import { SnmpService } from './snmp.service';

@Module({
  imports: [],
  controllers: [SnmpController],
  providers: [SnmpService],
})
export class SnmpModule {}


