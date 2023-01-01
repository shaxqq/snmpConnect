import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Snmp, Scan } from './snmp.interface';

@Injectable({
  providedIn: 'root'
})
export class SnmpService {
  constructor(public http: HttpClient) { }

  getSnmp(snmp: Snmp) {
    let sw = snmp.getSw()
    const body = {
      sw: sw,
      port: snmp.port
    }
    
    return this.http.post('http://188.231.188.124:3000/snmp', body)
  }
}

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  constructor(public http: HttpClient) { }
  macScan(scan: Scan) {
    let sw = scan.getSwitches()
    let mac = scan.getMac(scan.macSrc)
    const body = {
      switches: sw,
      macSrc: mac,
    }
  
    return this.http.post('http://188.231.188.124:3000/scan', body)
  }
}
