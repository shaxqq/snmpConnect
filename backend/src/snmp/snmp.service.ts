import { Injectable } from '@nestjs/common';
let snmp = require ("net-snmp");

// let session = snmp.createSession('172.17.4.11', '74FRfR7ewJar');


@Injectable()
export class SnmpService {
  async getSnmp(ip: string, sw: string) {
    
    return await new Promise((resolve, rej): any => {
      let session = snmp.createSession(ip, '74FRfR7ewJar');
      let oids = "1.3.6.1.2.1.2.2.1";
      let result = new Array

       const feedCb = async (varbinds: any) => {
           for (let objID of varbinds) {
            let masOid = objID.oid.split('.');
            if( masOid[9] == 5 || masOid[9] == 7 || masOid[9] == 8 ){
              if ( masOid[10] == sw ) {
                  result.push(objID.value)
              }
            }
          }
          if( result.length == 3){
            return resolve(result)          
           }
           
         }
        
        const doneCb = (err: string) => {
          if(err) {
            console.log('error: ', err)
            session.close();
          }
         }

      session.subtree(oids, feedCb, doneCb)
    })
  }
}

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