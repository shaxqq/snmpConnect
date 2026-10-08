import { Component } from '@angular/core';
import { CheckBdcomSolutionService } from './check.service';
import { Check } from './check.interface';


@Component({
  selector: 'app-check',
  templateUrl: './checkBdcomSolution.component.html', 
  styleUrls: ['./check.component.scss'],
  providers: [CheckBdcomSolutionService]
})
export class CheckBdcomSolutionComponent {

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
  
  constructor(public checkBdcomSolutionService: CheckBdcomSolutionService) { }

  submit(check: Check) {
    this.done = false
    this.checkBdcomSolutionService.getCheck(check).subscribe((data:any) => {
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

    //const regexStatusPort = /EPON0[\s\S]*register\s+/;
    const regexStatusPort = new RegExp(`${ponPort}\\s+is[\\s\\S]*\\d+\\sregister`)
    const regexStatusPortOne = new RegExp(`${ponPort}\\s+is[\\s\\S]*?--M`)
    const regexStatusPortTwoo = /e--[\s\S]*?\d+\sregister\s/g
    const matchStatusPortOne = data.match(regexStatusPortOne)
    const matchStatusPortTwoo = [...data.matchAll(regexStatusPortTwoo)]
    const result = matchStatusPortTwoo[matchStatusPortTwoo.length - 1][0];
    console.log(matchStatusPortTwoo)
    console.log(result)
    const matchStatusPort = data.match(regexStatusPort)
    console.log(matchStatusPort)
    // const matchStatusPortAll = matchStatusPortOne[0].slice(0, -4).concat(matchStatusPortTwoo[0].slice(30))
    // console.log(matchStatusPortAll)
    this.extractedBlocks.statusPort = matchStatusPort

    const regexMacOn = /\s+Mac Address Table[\s\S]*?:\d+\s+/;
    const regexMacOff = /\s+Mac Address Table[\s\S]*?Vlan[\s\S]*-----\s+/;
    const matchMac = data.match(regexMacOn) || data.match(regexMacOff)
    console.log(matchMac)
    this.extractedBlocks.mac = matchMac
    
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

    
  }
}