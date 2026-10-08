import { Component } from '@angular/core';
import { CheckRaisecomGService } from './check.service';
import { Check } from './check.interface';


@Component({
  selector: 'app-check',
  templateUrl: './checkRaisecomG.component.html', 
  styleUrls: ['./check.component.scss'],
  providers: [CheckRaisecomGService]
})
export class CheckRaisecomGComponent {

  check: Check = new Check('', '')
  done: any = true
  extractedBlocks = {
    intBr: '',
    statusPort: '',
    loop: '',
    mac: '',
    dhcp: '',
    cabTest: '',
    err: '',
    version: ''
  }
  
  constructor(public checkRaisecomGService: CheckRaisecomGService) { }

  submit(check: Check) {
    this.done = false
    this.checkRaisecomGService.getCheck(check).subscribe((data:any) => {
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

    const regexIntBr = /Interface\s+Admin\s+Operate[\s\S]*?NULL/;
    const matchIntBr = data.match(regexIntBr)
    console.log(matchIntBr)
    this.extractedBlocks.intBr = matchIntBr[0].slice(0, -4)    
    
    const regexStatusPort = /gigaethernet\d+\/\d+\/\d+\sis[\s\S]*?macerr\s/;
    const matchStatusPort = data.match(regexStatusPort)
    console.log(matchStatusPort)
    this.extractedBlocks.statusPort = matchStatusPort
    
    const regexLoop = /Interface\s+pktVlan[\s\S]*?172/;
    const matchLoop = data.match(regexLoop)
    console.log(matchLoop)
    this.extractedBlocks.loop = matchLoop[0].slice(0, -3)
    
    const regexMac = /Mac Address\s+Port[\s\S]*?172/;
    const matchMac = data.match(regexMac)
    console.log(matchMac)
    this.extractedBlocks.mac = matchMac[0].slice(0, -3)
    
    const regexDhcp = /IP Address\s+MAC Address[\s\S]*?172/;
    const matchDhcp = data.match(regexDhcp)
    console.log(matchDhcp)
    this.extractedBlocks.dhcp = matchDhcp[0].slice(0, -3)
    
    const regexCabTest = /Port:\sgigaethernet\d+\/\d+\/\d+\s+[\s\S]*?172/;
    const matchCabTest = data.match(regexCabTest)
    console.log(matchCabTest)
    this.extractedBlocks.cabTest = matchCabTest[0].slice(0, -3)
    
    const regexErr = /Interface:gigaethernet\d+\/\d+\/\d+\s+[\s\S]*?172/;
    const matchErr = data.match(regexErr)
    console.log(matchErr)
    this.extractedBlocks.err = matchErr[0].slice(0, -3)

    const regexVersion = /Raisecom Operating System Software[\s\S]*?172/;
    const matchVersion = data.match(regexVersion)
    console.log(matchVersion)
    this.extractedBlocks.version = matchVersion[0].slice(0, -3)
  }
}