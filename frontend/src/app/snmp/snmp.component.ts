import { Component, OnInit } from '@angular/core';
import { SnmpService } from './snmp.service';
import { Speed } from './snmp.interface';

@Component({
  selector: 'app-snmp',
  templateUrl: './snmp.component.html',
  styleUrls: ['./snmp.component.scss'],
  providers: [SnmpService]
})
export class SnmpComponent implements OnInit {

  speed: Speed = new Speed('', '')
  // ip:string = ''
  // sw:string = ''
  receivedSpeed = ''
  done: boolean = false
  constructor(private snmpService: SnmpService) { }

  ngOnInit(): void {
  }

  submit(speed: Speed) {
    this.snmpService.getSpeed(speed).subscribe((data:any) => {
    
        this.receivedSpeed = data
        this.done=true;
        console.log(data)
       // console.log(this.receivedSpeed.toString().slice(0, -6))
    });
  }
}

//`Порт поднят в : ${data.value.split(0, -6)} мб` 