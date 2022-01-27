import { Component, OnInit } from '@angular/core';
import { SnmpService } from './snmp.service';
import { Snmp } from './snmp.interface';

@Component({
  selector: 'app-snmp',
  templateUrl: './snmp.component.html',
  styleUrls: ['./snmp.component.scss'],
  providers: [SnmpService]
})
export class SnmpComponent implements OnInit {

  snmp: Snmp = new Snmp('', '')
  // ip:string = ''
  // sw:string = ''
  receivedSnmp = ''
  done: boolean = false
  constructor(private snmpService: SnmpService) { }

  ngOnInit(): void {
  }

  submit(snmp: Snmp) {
    this.snmpService.getSnmp(snmp).subscribe((data:any) => {
        this.receivedSnmp = data
        this.done=true;
        console.log(data)
       // console.log(this.receivedSpeed.toString().slice(0, -6))
    }); 
  }
}

// `Порт поднят в : ${data.value.split(0, -6)} мб` 