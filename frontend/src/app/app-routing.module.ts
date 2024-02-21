import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScanComponent, SnmpComponent } from './snmp/snmp.component';
import { Info } from './info/info.component';
import { CheckComponent } from './baseCheck/check.component';
import { CheckZteComponent } from './baseCheck/checkZte.component';
import { CheckLinksysComponent } from './baseCheck/checkLinksys.component';
import { CheckDlinkComponent } from './baseCheck/checkDlink.component';
import { CheckBdcomComponent } from './baseCheck/checkBdcom.component';
import { CheckBdcomSolutionComponent } from './baseCheck/checkBdcomSolution.component';
import { CheckBdcomGComponent } from './baseCheck/checkBdcomG.component';
import { CheckRaisecomGComponent } from './baseCheck/checkRaisecomG.component';
import { CheckFoxGateComponent } from './baseCheck/checkFoxGate.component';
import { DhcpLogComponent } from './dhcpLog/dhcpLog.component';

const routes: Routes = [
  // { path: '', component:  },
  { path: 'snmp', component: SnmpComponent },
  { path: 'scan', component: ScanComponent },
  { path: 'info', component: Info },
  { path: 'check', component: CheckComponent },
  { path: 'checkzte', component: CheckZteComponent },
  { path: 'checklinksys', component: CheckLinksysComponent },
  { path: 'checkdlink', component: CheckDlinkComponent },
  { path: 'checkbdcom', component: CheckBdcomComponent },
  { path: 'checkbdcomsolution', component: CheckBdcomSolutionComponent },
  { path: 'checkbdcomg', component: CheckBdcomGComponent },
  { path: 'checkraisecomg', component: CheckRaisecomGComponent },
  { path: 'checkfoxgate', component: CheckFoxGateComponent },
  { path: 'dhcplog', component: DhcpLogComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
