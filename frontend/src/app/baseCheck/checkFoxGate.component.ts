import { Component } from '@angular/core';
import { CheckFoxGateService } from './check.service';
import { Check } from './check.interface';


@Component({
  selector: 'app-check',
  templateUrl: './checkFoxGate.component.html', 
  styleUrls: ['./check.component.scss'],
  providers: [CheckFoxGateService]
})
export class CheckFoxGateComponent {

  check: Check = new Check('', '')
  done: any = true
  extractedBlocks = {
    intBr: '',
    statusPort: '',
    mac: '',
    dhcp: '',
    err: '',
    runPort: '',
    log: '',
  }
  
  constructor(public checkFoxGateService: CheckFoxGateService) { }

  submit(check: Check) {
    this.done = false
    this.checkFoxGateService.getCheck(check).subscribe((data:any) => {
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

    const regexIntBrOne = /Port\s+Desc\s+Link[\s\S]*?....press/;
    const regexIntBrTwoo = /page[\s\S]*?Total entries: \d+\s.\s/;
    const matchIntBrOne = data.match(regexIntBrOne)
    const matchIntBrTwoo = data.match(regexIntBrTwoo)
    const matchIntBrAll = matchIntBrOne[0].slice(0, -9).concat(matchIntBrTwoo[0].slice(17))
    console.log(matchIntBrAll)
    this.extractedBlocks.intBr = matchIntBrAll      
    
    const regexStatusPort = /\sFast Ethernet[\s\S]*?172/;
    const matchStatusPort = data.match(regexStatusPort)
    console.log(matchStatusPort)
    this.extractedBlocks.statusPort = matchStatusPort[0].slice(0, -3) 
    
    const regexMacOn = /MAC Address[\s\S]*?172/;
    const regexMacOff = /The mac does not exist !/;
    const matchMac = data.match(regexMacOn) || data.match(regexMacOff)
    console.log(matchMac)
    this.extractedBlocks.mac = matchMac[0].slice(0, -3) 
    
    const regexDhcp = /DHCP client information:[\s\S]*?Printed entries:\s\d+.\s/;
    const matchDhcp = data.match(regexDhcp)
    console.log(matchDhcp)
    this.extractedBlocks.dhcp = matchDhcp  
    
    const regexErr = /Port number\s+:\s+[\s\S]*?Total entries:\s\d+.\s/;
    const matchErr = data.match(regexErr)
    console.log(matchErr)
    this.extractedBlocks.err = matchErr
    
    const regexRunPort = /Building configuration...[\s\S]*?end\s/;
    const matchRunPort = data.match(regexRunPort)
    console.log(matchRunPort)
    this.extractedBlocks.runPort = matchRunPort
    
    const regexLog = /logg buf[\s\S]*?172/;
    const matchLog = data.match(regexLog)
    const matchLogAll = matchLog[0].split(/....press ENTER to next line, Q to quit, other key to next page..../)
    console.log(matchLog)
    console.log(matchLogAll)
    this.extractedBlocks.log = matchLogAll[0].concat(matchLogAll[1].slice(9, -3))

  }
}