import { Injectable } from '@nestjs/common';
let snmp = require ("net-snmp");

// let session = snmp.createSession('172.17.4.11', '74FRfR7ewJar');


@Injectable()
export class SnmpService {
   getSnmp(sw: string, port: string) {


    
    return new Promise((resolve, rej) => {
      let session = snmp.createSession(sw, '74FRfR7ewJar');
      var result = []
      
     // var resulT = result.concat(result)
       const feedCb = (varbinds: any) => {
           for (let objID of varbinds) {
            let masOid = objID.oid.split('.');
            if( masOid[9] == 5 || masOid[9] == 7 || masOid[9] == 8 ){
              if ( masOid[10] == port ) {
                result.push( objID.value )
              }
            }
          }
          
          if(result.length != 0){
            console.log(result)
             return resolve(result)
           }
            
         }
        
         const fCb = (varbinds: any)=>{
           for(let objID of varbinds){
            let masOid = objID.oid.split('.');
            let mac = '';
           for(let i = 14; i < masOid.length; i++)
           {
               let oidMac = parseInt(masOid[i]).toString(16);
               if (oidMac.length == 1)
               oidMac = "0" + oidMac;
               mac += oidMac;
           }
          // objID.value == port ? result.push(mac) : result.push('')
           if(objID.value == port)
           {
            result.push( mac )
           }
         }
        }

        const doneCb = (err: string) => {
          if(err) {
            console.log('error: ', err)
            session.close();
          }
         }
         
      session.subtree("1.3.6.1.2.1.2.2.1", feedCb, doneCb)
      session.subtree("1.3.6.1.2.1.17.7.1.2.2.1.2", fCb, doneCb)
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