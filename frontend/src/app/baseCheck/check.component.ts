import { Component } from '@angular/core';
import { CheckService } from './check.service';
import { Check } from './check.interface';


@Component({
  selector: 'app-check',
  templateUrl: './check.component.html', 
  styleUrls: ['./check.component.scss'],
  providers: [CheckService]
})
export class CheckComponent {

  check: Check = new Check('', '')
  done: any = true
  extractedBlocks = {
    intPort: '',
    loop: '',
    mac: '',
    dhcpSnoop: '',
    cabTest: '',
    logs: '',
    version: '',
    err: ''
  }
  
  constructor(public checkService: CheckService) { }

  submit(check: Check) {
    this.done = false
    this.checkService.getCheck(check).subscribe((data:any) => {
        this.extractDataIntoBlocks(data);
        this.done=true;
        console.log(data)
    },
    (error: any) => {
      console.error('Error fetching data:', error);
    }
    ); 
    //console.log(this.receivedSnmp.linkSt)
   // this.done=true;
  }
  private extractDataIntoBlocks(data: any) {

    const regexIntBr = /Port\s+Admin\s+Operate[\s\S]*?172/;
    const matchIntBr = data.match(regexIntBr)
    console.log(matchIntBr)
    this.extractedBlocks.intPort = matchIntBr[0].slice(0, -3)

    const regexLoop = /Port State Status[\s\S]*?172/;
    const matchLoop = data.match(regexLoop)
    console.log(matchLoop)
    this.extractedBlocks.loop = matchLoop[0].slice(0, -3)

    const regexMac = /Aging time:[\s\S]*?172/;
    const matchMac = data.match(regexMac)
    console.log(matchMac)
    this.extractedBlocks.mac = matchMac[0].slice(0, -3)

    const regexDhcpSnoop = /\sCurrent Binding:[\s\S]*?172/;
    const matchDhcpSnoop = data.match(regexDhcpSnoop)
    console.log(matchDhcpSnoop)
    this.extractedBlocks.dhcpSnoop = matchDhcpSnoop[0].slice(0, -3)

    const regexCabTest = /\sPort\s+Attribute\s+Time\s+[\s\S]*?172/;
    const matchCabTest = data.match(regexCabTest)
    console.log(matchCabTest)
    this.extractedBlocks.cabTest = matchCabTest[0].slice(0, -3)

    const regexLogs = /\sLogging information in file[\s\S]*?172/;
    const matchLogs = data.match(regexLogs)
    console.log(matchLogs)
    this.extractedBlocks.logs = matchLogs[0].slice(0, -3)
    
    const regexVersion = /Raisecom Operating System Software[\s\S]*?172/;
    const matchVersion = data.match(regexVersion)
    console.log(matchVersion)
    this.extractedBlocks.version = matchVersion[0].slice(0, -3)
    
    const regexErr = /port\s+\d+\sst[\s\S]*?172/;
    const matchErr = data.match(regexErr)
    console.log(matchErr)
    this.extractedBlocks.err = matchErr[0].slice(10, -3)



  }
}