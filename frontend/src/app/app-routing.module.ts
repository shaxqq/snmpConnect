import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScanComponent, SnmpComponent } from './snmp/snmp.component';
import { Info } from './info/info.component';

const routes: Routes = [
  // { path: '', component:  },
  { path: 'snmp', component: SnmpComponent },
  { path: 'scan', component: ScanComponent },
  { path: 'info', component: Info },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
