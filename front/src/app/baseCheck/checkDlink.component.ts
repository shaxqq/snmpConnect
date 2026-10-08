import { Component } from '@angular/core';
import { CheckDlinkService } from './check.service';
import { Check } from './check.interface';


@Component({
  selector: 'app-check',
  templateUrl: './checkDlink.component.html', 
  styleUrls: ['./check.component.scss'],
  providers: [CheckDlinkService]
})
export class CheckDlinkComponent {

  check: Check = new Check('', '')
  done: any = true
  extractedBlocks = {
    intPort: '',
    mac: '',
    block: '',
    ipAll: '',
    dhcpBin: '',
    err: '',
    cabTest: '',
    version: '',
    logs: ''
  }
  
  constructor(public checkDlinkService: CheckDlinkService) { }

  submit(check: Check) {
    this.done = false
    this.checkDlinkService.getCheck(check).subscribe((data:any) => {
        console.log(data)
        this.extractDataIntoBlocks(data);
        this.done=true;
        
    },
    (error: any) => {
      console.error('Error fetching data:', error);
    }
    ); 
    //console.log(this.receivedSnmp.linkSt)
   // this.done=true;
  }
   private extractDataIntoBlocks(data: any) {
  //  const regexIntPort = /\sPort\s+State\/\s+Settings\s+Connection\s+Address\s+MDIX\s+Speed\/Duplex\/FlowCtrl\s+Speed\/Duplex\/FlowCtrl\s+Learning[\s\S]*?Auto\s/
    const regexIntPort = /\sPort\s+State\/\s+Settings\s+Connection\s+Address[\s\S]*?:admin#/
    const matchIntPort = data.match(regexIntPort)
    const matchIntPortAll = matchIntPort[0].split(/CTRL[\s\S]*?\d+A/)
    console.log(matchIntPort)
    console.log(matchIntPortAll)
    this.extractedBlocks.intPort = matchIntPortAll[0].slice(0, -1399)

    const regexMac = /\sVID[\s\S]*?Total Entries: \d+\s/
    const matchInMac = data.match(regexMac)
    console.log(matchInMac)
    this.extractedBlocks.mac = matchInMac

    const regexBlock = /\sVID\s+VLAN\s+Name\s+MAC Address\s+Port\s+-[\s\S]*?Total Entries : \d+\s/
    const matchBlock = data.match(regexBlock)
    console.log(matchBlock)
    this.extractedBlocks.block = matchBlock

    const regexIpAll = /\sIP[\s\S]*?Total Entries : \d+\s/
    const matchIpAll = data.match(regexIpAll)
    console.log(matchIpAll)
    this.extractedBlocks.ipAll = matchIpAll 

    const regexDhcpBin = /\sIP Address\s+MAC Address\s+S\s+LT\(sec\)\s+Port\s+-[\s\S]*?Total Entries : \d+\s/
    const matchDhcpBin = data.match(regexDhcpBin)
    console.log(matchDhcpBin)
    this.extractedBlocks.dhcpBin = matchDhcpBin

    const regexErr = /\sPort Number :[\s\S]*?Symbol Error \s+\d+\s/
    const matchErr = data.match(regexErr)
    console.log(matchErr)
    this.extractedBlocks.err = matchErr

    const regexCabTest = /Port\s+Type\s+Link Status\s+Test Result\s+Cable Length\s\(M\)\s+-[\s\S]*?admin#/
    const matchCabTest = data.match(regexCabTest)
    console.log(matchCabTest)
    this.extractedBlocks.cabTest = matchCabTest[0].slice(0, -20)

    const regexVersion = /Device Type\s+:[\s\S]*?\d+\s+seconds/
    const matchVersion = data.match(regexVersion)
   // const matchVersionAll = matchVersion[0].split(/CTRL[\s\S]*?\d+C/)
    console.log(matchVersion)
    this.extractedBlocks.version = matchVersion
    //All[0].concat(matchVersionAll[1].slice(0, -19))

    const regexLogs = /Index\s+Date\s+Time\s+Level\s+Log\s+Text[\s\S]*?admin#/
    const matchLogs = data.match(regexLogs)
    const matchLogsAll = matchLogs[0].split(/CTRL[\s\S]*?\d+C/)
    console.log(matchLogs)
    console.log(matchLogsAll)
    this.extractedBlocks.logs = matchLogsAll[0].slice(0,-7).concat(matchLogsAll[1].slice(0, -7), matchLogsAll[2].slice(0, -7))

   }
}