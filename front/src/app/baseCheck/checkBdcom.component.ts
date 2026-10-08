import { Component } from '@angular/core';
import { CheckBdcomService } from './check.service';
import { Check } from './check.interface';


@Component({
  selector: 'app-check',
  templateUrl: './checkBdcom.component.html', 
  styleUrls: ['./check.component.scss'],
  providers: [CheckBdcomService]
})
export class CheckBdcomComponent {

  check: Check = new Check('', '')
  done: any = true
  extractedBlocks = {
    intBr: '',
    statusPort: '',
    mac: '',
    optDiag: '',
    runConfEpon: '',
    eponInactive: '',
    logs: '',
  }
  
  constructor(public checkBdcomService: CheckBdcomService) { }

  submit(check: Check) {
    this.done = false
    this.checkBdcomService.getCheck(check).subscribe((data:any) => {
        this.extractDataIntoBlocks(data);
        this.done=true;
        console.log(data)
        console.log(check.port.toUpperCase())
    },
    (error: any) => {
      console.error('Error fetching data:', error);
    }
    ); 
    //console.log(this.receivedSnmp.linkSt)
   // this.done=true;
  }
  private extractDataIntoBlocks(data: any) {
    const ponPort = this.check.port.toUpperCase().trim()

    const regexIntBr = /Port\s+Description\s+Status\s+Vlan\s+Duplex\s+Speed\s+Type[\s\S]*Giga-PON\s/;
    const matchIntBr = data.match(regexIntBr)
    console.log(matchIntBr)
    this.extractedBlocks.intBr = matchIntBr

    const regexStatusPort = new RegExp(`${ponPort}\\s+is[\\s\\S]*?Transm[\\s\\S]*?\\d+\\sregister`)
    const matchStatusPort = data.match(regexStatusPort)
    const matchStatusPortAll = matchStatusPort[0].split(/ --More--         /)
    console.log(matchStatusPort)
    console.log(matchStatusPortAll)
    this.extractedBlocks.statusPort = matchStatusPortAll[0].concat(matchStatusPortAll[1])

    const regexMac = /mac address-table[\s\S]*?Switch/;
    const regexMacOne = /mac address-table[\s\S]*?172/;
    const matchMac = data.match(regexMac) || data.match(regexMacOne)
    console.log(matchMac)
    // if(matchMac[0].includes('172')){
    //   //matchMac = data.match(regexMacOne)
    //   this.extractedBlocks.mac = matchMac[0].slice(38, -3)
    // }
    console.log(matchMac)
    this.extractedBlocks.mac = matchMac[0].slice(38, -6)
    
    const regexOptDiag = /\s+interface\s+RxPower\(dBm\)[\s\S]*?-\d+.\d+\s+/;
    const matchOptDiag = data.match(regexOptDiag)
    console.log(matchOptDiag)
    this.extractedBlocks.optDiag = matchOptDiag
    
    const regexRunConfEponOn = /epon\sonu\sport[\s\S]*?detect\s+/;
    const regexRunConfEponOff = /Current configuration:\s+!\s+/;
    const matchRunConfEpon = data.match(regexRunConfEponOn) || data.match(regexRunConfEponOff)
    console.log(matchRunConfEpon)
    this.extractedBlocks.runConfEpon = matchRunConfEpon
    

    const regexEponInactiveOne = new RegExp(`${ponPort}\\s+\\w+[.]\\w+[.]\\w+\\s+[\\s\\S]*?\\s+\\w+[.]\\d+:\\d+:\\d+\\s`);
    //+\\w+\\S+\\s+\\w+\\S+\\s+\\w+\\S+\\s+\\w+\\S+\\s
    const regexEponInactiveTwoo = new RegExp(`${ponPort}\\s+\\w+[.]\\w+[.]\\w+\\s+[\\s\\S]*?\\s+[.]\\d+:\\d+:\\d+\\s`);
    console.log(regexEponInactiveOne)
    console.log(regexEponInactiveTwoo)
    const matchEponInactive = data.match(regexEponInactiveOne) || data.match(regexEponInactiveTwoo)
    console.log(matchEponInactive)
    this.extractedBlocks.eponInactive = matchEponInactive

    const regexLogs = /sh log[\s\S]*?Switch/;
    const regexLogsOne = /sh log[\s\S]*?172/;
    const matchLogs = data.match(regexLogs) || data.match(regexLogsOne)
    const matchLogsAll = matchLogs[0].split(/ --More--         /)
    console.log(matchLogs)
    console.log(matchLogsAll)
    this.extractedBlocks.logs = matchLogsAll[0].slice(7).concat(matchLogsAll[1], matchLogsAll[2])
  }
}