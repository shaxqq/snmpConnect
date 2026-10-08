import { Injectable } from '@nestjs/common';
import { result } from './dto/snmp.dto'
import { admStPort, descrPort, errorPort, macPort, phyStPort, speedPort, vlanPort, } from './generalArea/general.service';
import { bindingLinksys } from './linksysArea/linksys.service'
import { bindingGRaisecom } from './raisecomArea/raisecomG.service';
import { bindingRaisecom } from './raisecomArea/raisecom.service';
import { errZte, bindingZte } from './zteArea/zte.service';
import { bindingFoxGate } from './foxGateArea/foxGate.service';
//import { bindingBdcom } from './bdcomArea/bdcom.service';

let snmp = require("net-snmp");

@Injectable()
export class SnmpService {
 
  getSnmp(sw: string, port: string) {
    return new Promise((resolve) => {

        if(sw == undefined || sw == '' || port == ''){
          return resolve(result)
        }

        let session = snmp.createSession(sw, '74FRfR7ewJar');
        result.port = port  
        

        const doneEr = (err: string) => {
          if (err) {
            console.log('error: ', err)
           // session.close();
          }
        }

        setTimeout(() => {
          if(result.adminSt == '2' || result.linkSt == '2'){
            result.macAddr = '',
            result.vlan = '',
            result.binding.ip = '',
            result.binding.lease = '',
            result.binding.type = '',
            result.binding.int = ''
            // result.err.fcs = '',
            // result.err.collision = '',
            // result.err.macEr = '',
            // result.err.symbol = ''
            return resolve(result)
            }
          return resolve(result)
        }, 20000)
  //20000
        session.subtree("1.3.6.1.2.1.2.2.1.5", speedPort, doneEr)
        session.subtree("1.3.6.1.2.1.2.2.1.7", admStPort, doneEr)
        session.subtree("1.3.6.1.2.1.2.2.1.8", phyStPort, doneEr)
        session.subtree("1.3.6.1.2.1.17.7.1.2.2.1.2", macPort, doneEr)
        session.subtree("1.3.6.1.2.1.31.1.1.1.18", descrPort, doneEr)
        session.subtree("1.3.6.1.2.1.17.7.1.4.5.1.1", vlanPort, doneEr)
        session.subtree("1.3.6.1.2.1.10.7.2.1", errorPort, doneEr)
        session.subtree("1.3.6.1.2.1.2.2.1", errZte, doneEr)
        session.subtree("1.3.6.1.4.1.3955.89.112.1.11.1", bindingLinksys, doneEr) 
        session.subtree("1.3.6.1.4.1.8886.6.1.23.1.1.5.1", bindingGRaisecom, doneEr)
        session.subtree("1.3.6.1.4.1.8886.6.1.23.1.1.5.1", bindingRaisecom, doneEr)
        session.subtree("1.3.6.1.4.1.3902.15.2.30.22.3.1", bindingZte, doneEr)
        session.subtree("1.3.6.1.4.1.5651.1.2.1.1.9.11.1.1", bindingFoxGate, doneEr)
        //  session.subtree("1.3.6.1.4.1.3320.2.233.2.1", bindingBdcom, doneEr) 
    })
  }
}