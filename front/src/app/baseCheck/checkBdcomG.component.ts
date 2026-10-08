import { Component } from '@angular/core';
import { CheckBdcomGService } from './check.service';
import { Check } from './check.interface';


@Component({
  selector: 'app-check',
  templateUrl: './checkBdcomG.component.html', 
  styleUrls: ['./check.component.scss'],
  providers: [CheckBdcomGService]
})
export class CheckBdcomGComponent {

  check: Check = new Check('', '')
  done: any = true
  extractedBlocks = {
    intBr: '',
    statusPort: '',
    mac: '',
    optDiag: '',
    runConfEpon: '',
    eponInactive: '',
  }
  
  constructor(public checkBdcomGService: CheckBdcomGService) { }

  submit(check: Check) {
    this.done = false
    this.checkBdcomGService.getCheck(check).subscribe((data:any) => {
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

    const regexIntBr = /Port\s+Description[\s\S]*?Switch/;
   // const regexIntBrTwoo = /gpon0\/10[\s\S]*GPON\s/;
    const matchIntBr = data.match(regexIntBr)
  //  const matchIntBrTwoo = data.match(regexIntBrTwoo)
    const matchIntBrAll = matchIntBr[0].split(/ --More--         /)
    console.log(matchIntBrAll)
    this.extractedBlocks.intBr = matchIntBrAll[0].concat(matchIntBrAll[1].split(0, -6))
    
    const regexStatusPort = new RegExp(`${ponPort}\\s+is[\\s\\S]*?Switch`)
    const matchStatusPort = data.match(regexStatusPort)
    console.log(matchStatusPort)
    this.extractedBlocks.statusPort = matchStatusPort[0].slice(0, -6)

    const regexMacOn = /\s+Mac Address Table[\s\S]*?:\d+-\d+\s/;
    const matchMac = data.match(regexMacOn) || 'No matching mac address!'
    console.log(matchMac)
    this.extractedBlocks.mac = matchMac

    const regexOptDiag = /\s+interface\s+RxPower\(dBm\)[\s\S]*?Switch/;
    const matchOptDiag = data.match(regexOptDiag)
    console.log(matchOptDiag)
    this.extractedBlocks.optDiag = matchOptDiag[0].slice(0, -6)

    const regexRunConfEponOn = /Current configuration:[\s\S]*?Switch/;
    const matchRunConfEpon = data.match(regexRunConfEponOn)
    console.log(matchRunConfEpon)
    this.extractedBlocks.runConfEpon = matchRunConfEpon[0].slice(0, -6)

    const regexEponInactiveOne = new RegExp(`${ponPort}\\s+BDCM:[\\s\\S]*?\\d+:\\d+:\\d+\\s\\w+\\s`);
    const regexEponInactiveTwoo = new RegExp(`${ponPort}\\s+BDCM:[\\s\\S]*?Unknown\\s`);
    console.log(regexEponInactiveOne)
    console.log(regexEponInactiveTwoo)
    const matchEponInactive = data.match(regexEponInactiveOne) || data.match(regexEponInactiveTwoo)
    console.log(matchEponInactive)
    this.extractedBlocks.eponInactive = matchEponInactive
  }
}