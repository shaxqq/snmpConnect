import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Snmp } from './snmp.interface';

@Injectable({
  providedIn: 'root'
})
export class SnmpService {

  constructor(private http: HttpClient) { }

   getSnmp(snmp:Snmp){
    const body = {
      sw: snmp.sw,
      port: snmp.port
    }
    // const params = new HttpParams().set('ip', ip.toString()).set('sw', sw.toString())
    // console.log(sw)
    return this.http.post('http://localhost:3000/snmp', body)
  } 
}
