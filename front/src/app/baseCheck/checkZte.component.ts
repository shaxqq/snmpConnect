import { Component } from '@angular/core';
import { CheckZteService } from './check.service';
import { Check } from './check.interface';


@Component({
  selector: 'app-check',
  templateUrl: './checkZte.component.html', 
  styleUrls: ['./check.component.scss'],
  providers: [CheckZteService]
})
export class CheckZteComponent {

  check: Check = new Check('', '')
  done: any = true
  extractedBlocks = {
    intPort: '',
    mac: '',
    dhcp: '',
    dhcpSnoop: '',
    acl: '',
    err: '',
    cabTest: '',
    logs: '',
    version: ''
  }
  
  constructor(public checkZteService: CheckZteService) { }

  submit(check: Check) {
    this.done = false
    this.checkZteService.getCheck(check).subscribe((data:any) => {
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
    const regexIntPort = /\s+PortId\s+:[\s\S]*?bps\s+/;
    const matchIntPort = data.match(regexIntPort)
    console.log(matchIntPort)
    this.extractedBlocks.intPort = matchIntPort

    const regexMacNew = /dyn port\s+[\s\S]*?172/;
    const regexMacOld = /fdb port\s+[\s\S]*?172/;
    // const regexMacOn = /\sMacAddress\s+Vlan\s+PortId\s+Type\s+[\s\S]*?Fixed:\s\d+/;
    // const regexMacOff = /\s+%\s+No matching mac address!/;
    let matchMac = data.match(regexMacNew) 
    console.log(matchMac)
    if(matchMac[0].includes('Command not found')){
      matchMac = data.match(regexMacOld) 
    }
    this.extractedBlocks.mac = matchMac[0].slice(12, -3)

    const regexDhcp = /sh dhcp\s+DHCP[\s\S]*?172/;
    // const regexDhcp = /\s+DHCP\s+[\s\S]*?21\s+[\s\S]*?\-/;
    // const regexDhcp2 = /\s+22\s+[\s\S]*?DHCP client is disabled./;
    const matchDhcp = data.match(regexDhcp)
    // const matchDhcp = data.match(regexDhcp)
    // const matchDhcp2 = data.match(regexDhcp2)
    console.log(matchDhcp)
    // console.log(matchDhcp2)
    const dhcpAll = matchDhcp[0].split(/----- more[\s\S]*?                                                 /)
    console.log(dhcpAll)
    // const dhcpAll = matchDhcp[0].slice(0, -1).concat(matchDhcp2[0]) || ''
    // const dhcpAll = matchDhcp[0].slice(0, -1).concat(matchDhcp2[0]) || ''
    this.extractedBlocks.dhcp = dhcpAll[0].slice(8).concat(dhcpAll[1].slice(0, -3))
   
    const regexDhcpSnoop = /\s+DHCP snooping binding[\s\S]*?172/;
    const matchDhcpSnoop = data.match(regexDhcpSnoop)
    console.log(matchDhcpSnoop)
    this.extractedBlocks.dhcpSnoop = matchDhcpSnoop[0].slice(0, -3)
    
    const regexAcl = /\s+Id\s+PortType\s+AclNo[\s\S]*?-------\s+-------\s+/;
    const matchAcl = data.match(regexAcl)
    console.log(matchAcl)
    this.extractedBlocks.acl = matchAcl
    
    const regexErr = /port\s+\d+\s+st[\s\S]*?172/;
    const matchErr = data.match(regexErr)
    console.log(matchErr)
    this.extractedBlocks.err = matchErr[0].slice(10, -3)

    // const regexCabTest = /\s+Cable Test[\s\S]*172/;
    // const matchCabTest = data.match(regexCabTest)
    // console.log(matchCabTest)
    // this.extractedBlocks.cabTest = matchCabTest[0].slice(0, -3)

    const regexLog = /ter log[\s\S]*?more/;
    const matchLog = data.match(regexLog)
    console.log(matchLog)
    this.extractedBlocks.logs = matchLog[0].slice(7, -10)
    
    const regexVersion = /sh version[\s\S]*?172/;
    const matchVersion = data.match(regexVersion)
    console.log(matchVersion)
    this.extractedBlocks.version = matchVersion[0].slice(10, -3)
  }
}