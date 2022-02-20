import { Injectable } from '@nestjs/common';
import {result} from './dto/snmp.dto'
import { fCbAdmSt, fCbDescr, fCbError, fCbMac, fCbPhySt, fCbSpeed, fCbVlan } from './generalArea/general.service';
import {fCbBindingLinksys} from './linksysArea/linksys.service'
import { fCbBindingGRaisecom } from './raisecomArea/raisecomG.service';
import { fCbBindingRaisecom } from './raisecomArea/raisecom.service';
let snmp = require("net-snmp");

// let session = snmp.createSession('172.17.4.11', '74FRfR7ewJar');


@Injectable()
export class SnmpService {
 // constructor(private port: string) {}
 
  //  constructor(private result: Result) {}
  //  constructor(private fCbBindingLinksys: FCbBindingLinksys) {}
   
  getSnmp(sw: string, port: string) {
    return new Promise((resolve) => {
      let session = snmp.createSession(sw, '74FRfR7ewJar');
      result.port = port  

     

      const doneCb = (err: string) => {
        if (err) {
          console.log('error: ', err)
          session.close();
        }
      }
      
      setTimeout(() => {
        return resolve(result)
      }, 20000)
//20000
      session.subtree("1.3.6.1.2.1.2.2.1.5", fCbSpeed, doneCb)
      session.subtree("1.3.6.1.2.1.2.2.1.7", fCbAdmSt, doneCb)
      session.subtree("1.3.6.1.2.1.2.2.1.8", fCbPhySt, doneCb)
      session.subtree("1.3.6.1.2.1.17.7.1.2.2.1.2", fCbMac, doneCb)
      session.subtree("1.3.6.1.2.1.31.1.1.1.18", fCbDescr, doneCb)
      session.subtree("1.3.6.1.2.1.17.7.1.4.5.1.1", fCbVlan, doneCb)
      session.subtree("1.3.6.1.4.1.3955.89.112.1.11.1", fCbBindingLinksys, doneCb) 
      session.subtree("1.3.6.1.4.1.8886.6.1.23.1.1.5.1", fCbBindingGRaisecom, doneCb)
      session.subtree("1.3.6.1.4.1.8886.6.1.23.1.1.5.1", fCbBindingRaisecom, doneCb)
      session.subtree("1.3.6.1.2.1.10.7.2.1", fCbError, doneCb)
     // .1.3.6.1.2.1.16.1.1.1.18.14
    })
  }
}

//1.3.6.1.2.1.10.7.2.1.3. fcs err/ crc  AlignErrors + 1.3.6.1.2.1.10.7.2.1.2
//1.3.6.1.2.1.10.7.2.1.16. MAC Rx Errors
//1.3.6.1.2.1.10.7.2.1.19 link duplex 2-half  3-full 1-nolink
//1.3.6.1.2.1.10.7.2.1.9 collision err
//1.3.6.1.2.1.10.7.2.1.18 symbol err
//1.3.6.1.2.1.31.1.1.1.18 gerkon linksys
//1.3.6.1.4.1.8886.6.1.1.1.19.0 // 16.0 
//Name/OID: .1.3.6.1.4.1.8886.6.1.1.1.19.0; Value (OctetString): ISCOM2828F-AC
//Name/OID: .1.3.6.1.4.1.8886.6.1.1.1.19.0; Value (OctetString): ISCOM2624G-4GE-AC

              // for(let i = 9; i < masOid.length; i++) {
              //   //speed
              //   if( masOid[9] == 5 && masOid[10] == sw ){
              //       result.push(objID.value)
              //       break
              //   }
              //   // link
              //   if( masOid[9] == 7 && masOid[10] == sw ){
              //       result.push(objID.value)
              //       break
              //   }
              // } 