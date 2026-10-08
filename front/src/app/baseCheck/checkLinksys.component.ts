import { Component } from '@angular/core';
import { CheckLinksysService } from './check.service';
import { Check } from './check.interface';


@Component({
  selector: 'app-check',
  templateUrl: './checkLinksys.component.html', 
  styleUrls: ['./check.component.scss'],
  providers: [CheckLinksysService]
})
export class CheckLinksysComponent {

  check: Check = new Check('', '')
  done: any = true
  extractedBlocks = {
    configPort: '',
    description: '',
    statusPort: '',
    mac: '',
    dhcpSnoop: '',
    bindingStatus: '',
    counters: '',
    system: '',
    cabTest: '',
    logs: '',
  }

  constructor(public checkLinksysService: CheckLinksysService) { }

  submit(check: Check) {
    this.done = false
    this.checkLinksysService.getCheck(check).subscribe((data:any) => {
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
    const regexConfigPort = /\s+Flow\s+Admin\s+Back\s+Mdix[\s\S]*?console/;
    const matchConfigPort = data.match(regexConfigPort)
    console.log(matchConfigPort)
    this.extractedBlocks.configPort = matchConfigPort[0].slice(0, -7)
    
    const regexDescription = /\sPort\s+Description[\s\S]*?console/;
    const matchDescription = data.match(regexDescription)
    console.log(matchDescription)
    this.extractedBlocks.description = matchDescription[0].slice(0, -7)

    const regexStatusPort = /\s+Flow\s+Link\s+Back\s+Mdix[\s\S]*?console/;
    const matchStatusPort = data.match(regexStatusPort)
    console.log(matchStatusPort)
    this.extractedBlocks.statusPort = matchStatusPort[0].slice(0, -7)

    const regexMac = /\s+Vlan\s+Mac\s+Address\s+Port\s+Type[\s\S]*?console/;
    const matchMac = data.match(regexMac)
    console.log(matchMac)
    this.extractedBlocks.mac = matchMac[0].slice(0, -7)

    const regexDhcpSnoop = /\s+Total number of binding:[\s\S]*?console/;
    const matchDhcpSnoop = data.match(regexDhcpSnoop)
    console.log(matchDhcpSnoop)
    this.extractedBlocks.dhcpSnoop = matchDhcpSnoop[0].slice(0, -7)

    const regexBindingStatus = /\sIP Source Guard[\s\S]*?console/;
    const matchBindingStatus = data.match(regexBindingStatus)
    console.log(matchBindingStatus)
    this.extractedBlocks.bindingStatus = matchBindingStatus[0].slice(0, -7)

    const regexCounters = /\s+Port\s+InUcastPkts[\s\S]*?console/;
    const matchCounters = data.match(regexCounters)
    console.log(matchCounters)
    this.extractedBlocks.counters = matchCounters[0].slice(0, -7)

    const regexSystem = /System Description:[\s\S]*?console/;
    const matchSystem = data.match(regexSystem)
    console.log(matchSystem)
    this.extractedBlocks.system = matchSystem[0].slice(0, -7) 
    
    // const regexCabTest = /port tdr[\s\S]*?console/;
    // const matchCabTest = data.match(regexCabTest)
    // console.log(matchCabTest)
    // this.extractedBlocks.cabTest = matchCabTest[0].slice(13, -7) 
    
    const regexLogs = /Application filtering control[\s\S]*?<return>/;
    const matchLogs = data.match(regexLogs)
    console.log(matchLogs)
    this.extractedBlocks.logs = matchLogs[0].slice(0, -8)

  }
}