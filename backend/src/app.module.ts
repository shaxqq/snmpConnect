import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScanController } from './scan/scan.controller';
import { ScanService } from './scan/scan.service';
import { SnmpController } from './snmp/snmp.controller';
import { SnmpService } from './snmp/snmp.service';

@Module({
  imports: [],
  controllers: [AppController, SnmpController, ScanController],
  providers: [AppService, SnmpService, ScanService],
})
export class AppModule {}
