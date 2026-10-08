import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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


import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { SearchPatternPipe } from './dhcpLog/searchPattern.pipe';



@NgModule({
  declarations: [
    AppComponent,
    SnmpComponent,
    ScanComponent,
    Info,
    CheckComponent,
    CheckZteComponent,
    CheckLinksysComponent,
    CheckDlinkComponent,
    CheckBdcomComponent,
    CheckBdcomSolutionComponent,
    CheckBdcomGComponent,
    CheckRaisecomGComponent,
    CheckFoxGateComponent,
    DhcpLogComponent,
    SearchPatternPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,

    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
