import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Speed } from './snmp.interface';

@Injectable({
  providedIn: 'root'
})
export class SnmpService {

  constructor(private http: HttpClient) { }

  getSpeed(speed:Speed){
    const body = {
      ip: speed.ip,
      sw: speed.sw
    }
    // const params = new HttpParams().set('ip', ip.toString()).set('sw', sw.toString())
    // console.log(sw)
    // console.log(params)
    return this.http.post('http://localhost:3000/snmp', body)
  }
}
