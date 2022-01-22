import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnmpController } from './snmp/snmp.controller';
import { SnmpService } from './snmp/snmp.service';

@Module({
  imports: [],
  controllers: [AppController, SnmpController],
  providers: [AppService, SnmpService],
})
export class AppModule {}
