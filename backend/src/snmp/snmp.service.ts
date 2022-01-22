import { Injectable } from '@nestjs/common';
let snmp = require ("net-snmp");

// let session = snmp.createSession('172.17.4.11', '74FRfR7ewJar');


@Injectable()
export class SnmpService {
  getSnmp(ip: string, sw: string) {
    
    return new Promise((resolve, rej): any => {
      let session = snmp.createSession(ip, '74FRfR7ewJar');
      let oids = "1.3.6.1.2.1.2.2.1";

       const feedCb = async (varbinds: any) => {
        let result = []
           for (let objID of varbinds) {
           //  console.log(objID)
            let masOid = objID.oid.split('.');
            
              for(let i = 9; i < masOid.length; i++) {
                //speed
                if( masOid[9] == 5 && masOid[10] == sw ){
                    result.push(objID.value)
                    break
                }
                // link
                if( masOid[9] == 7 && masOid[10] == sw ){
                    result.push(objID.value)
                    break
                }
              }             
           
            }
            if( result.length != 0){

              let resulT = [...result]
             // resulT.push(...result)
               console.log(result)

               console.log('res: ', resulT)
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

