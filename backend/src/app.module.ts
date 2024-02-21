import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScanController } from './scan/scan.controller';
import { ScanService } from './scan/scan.service';
import { SnmpController } from './snmp/snmp.controller';
import { SnmpService } from './snmp/snmp.service';
import { CheckController } from './check/check.controller';
import { CheckService } from './check/check.service';
import { CheckZteController } from './checkZTE/checkZte.controller';
import { CheckZteService } from './checkZTE/checkZte.service';
import { CheckLinksysController } from './checkLinksys/checkLinksys.controller';
import { CheckLinksysService } from './checkLinksys/checkLinksys.service';
import { CheckDlinkController } from './checkDlink/checkDlink.controller';
import { CheckDlinkService } from './checkDlink/checkDlink.service';
import { CheckBdcomController } from './checkBdcom/checkBdcom.controller';
import { CheckBdcomService } from './checkBdcom/checkBdcom.service';
import { CheckBdcomSolutionController } from './checkBdcomSolution/checkBdcomSolution.controller';
import { CheckBdcomSolutionService } from './checkBdcomSolution/checkBdcomSolution.service';
import { CheckBdcomGController } from './checkBdcomG/checkBdcomG.controller';
import { CheckBdcomGService } from './checkBdcomG/checkBdcomG.service';
import { CheckRaisecomGController } from './checkRaisecomG/checkRaisecomG.controller';
import { CheckRaisecomGService } from './checkRaisecomG/checkRaisecomG.service';
import { CheckFoxGateController } from './checkFoxGate/checkFoxGate.controller';
import { CheckFoxGateService } from './checkFoxGate/checkFoxGate.service';
import { DhcpLogController } from './dhcpLog/dhcpLog.controller';
import { DhcpLogService } from './dhcpLog/dhcpLog.service';

@Module({
  imports: [],
  controllers: [AppController, SnmpController, ScanController, CheckController, CheckZteController, CheckLinksysController, CheckDlinkController, CheckBdcomController, CheckBdcomGController, CheckRaisecomGController, CheckFoxGateController, CheckBdcomSolutionController, DhcpLogController],
  providers: [AppService, SnmpService, ScanService, CheckService, CheckZteService, CheckLinksysService, CheckDlinkService, CheckBdcomService, CheckBdcomGService, CheckRaisecomGService, CheckFoxGateService, CheckBdcomSolutionService, DhcpLogService],
})
export class AppModule { }
