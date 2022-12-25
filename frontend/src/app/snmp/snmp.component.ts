import { Component, OnInit } from '@angular/core';
import { SnmpService, ScanService } from './snmp.service';
import { Snmp, Scan } from './snmp.interface';

@Component({
  selector: 'app-snmp',
  templateUrl: './snmp.component.html',
  styleUrls: ['./snmp.component.scss'],
  providers: [SnmpService]
})
export class SnmpComponent implements OnInit {

  snmp: Snmp = new Snmp('', '')
  receivedSnmp = {
    speed: '',
    linkSt: '',
    adminSt: '',
    macAddr: '',
    description: '',
    vlan: '',
    binding: {
      ip: '',
      lease: '',
      type: '',
      int: '',
    },
    err: {
      fcs: '',
      collision: '',
      macEr: '',
      symbol: ''
    }
  }
  done: any = true
  constructor(public snmpService: SnmpService) { }

  ngOnInit(): void {
  }

  submit(snmp: Snmp) {
    this.done = false
    this.snmpService.getSnmp(snmp).subscribe((data:any) => {
      // if (data.includes('Request Timeout') || data.includes('ERROR')){
      //   data = ''
      // }
        this.receivedSnmp = data
        this.done=true;
        console.log(data)
       // console.log(this.receivedSpeed.toString().slice(0, -6)) 4421201594 4421201636 4421201684 4421200970 4421201523
    }); 
  }
}

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./snmp.component.scss'],
  providers: [ScanService]
})
export class ScanComponent implements OnInit {
  scan: Scan = new Scan([], '')
  receivedScan = []
   done: any = true
   
  constructor(public scanService: ScanService) { }

  ngOnInit(): void {
  }

 submit(scan: Scan) {
   this.done = false
     this.scanService.macScan(scan).subscribe((data:any) => {
      this.receivedScan = data
       this.done=true;
  }); 
  }
  
}