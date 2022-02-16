import { Injectable } from '@nestjs/common';
let snmp = require("net-snmp");

// let session = snmp.createSession('172.17.4.11', '74FRfR7ewJar');


@Injectable()
export class SnmpService {
  getSnmp(sw: string, port: string) {



    return new Promise((resolve) => {
      let session = snmp.createSession(sw, '74FRfR7ewJar');

      let res = ''
      const result = {
        speed: '',
        linkSt: '',
        adminSt: '',
        macAddr: '',
        description: '',
        vlan: '',
        binding: {
          ip: '',
          lease: '',
          type: '',
          int: '',
        },
      }

      // speed
      const fCbSpeed = (varbinds: any) => {
        for (let objID of varbinds) {
          let masOid = objID.oid.split('.');
          if (masOid[10] > 5000){
            let portg = parseInt(port) + 2082476032;
            res = portg.toString()
          }
          if (masOid[10] == port || (masOid[10]) == res) {
            result.speed += objID.value
          }
        }
      }
      // admin status
      const fCbAdmSt = (varbinds: any) => {
        for (let objID of varbinds) {
          let masOid = objID.oid.split('.');
          if (masOid[10] > 5000){
            let portg = parseInt(port) + 2082476032;
            res = portg.toString()
          }
          if (masOid[10] == port || (masOid[10]) == res) {
            result.adminSt += objID.value
          }
        }
      }
      // physical status
      const fCbPhySt = (varbinds: any) => {
        for (let objID of varbinds) {
          let masOid = objID.oid.split('.');
          if (masOid[10] > 5000){
            let portg = parseInt(port) + 2082476032;
            res = portg.toString()
          }
          if (masOid[10] == port || (masOid[10]) == res) {
            result.linkSt += objID.value
          }  
        }
      }

      // mac
      const fCbMac = (varbinds: any) => {
        for (let objID of varbinds) {
          let masOid = objID.oid.split('.');
          let mac = '';
          if (masOid[10] > 5000){
            let portg = parseInt(port) + 2082476032;
            res = portg.toString()
          }
          if (objID.value == port || objID.value == res && objID.value > 0) {
            for (let i = 14; i < masOid.length; i++) {
              let oidMac = parseInt(masOid[i]).toString(16);
              if (oidMac.length == 1)
                oidMac = "0" + oidMac;
                mac += oidMac;
            }
            result.macAddr += mac
          }
        }
      }

      // description
      const fCbDescr = (varbinds: any) => {
        for (let objID of varbinds) {
          let masOid = objID.oid.split('.');
          if (masOid[10] > 5000){
            let portg = parseInt(port) + 2082476032;
            res = portg.toString()
          }
          if (masOid[11] == port || masOid[11] == res) {
            result.description += objID.value.toString('utf8')
           // console.log(objID.value.toString('utf8'))
          }
        }
      }
      // vlan
      const fCbVlan = (varbinds: any) => {
        for (let objID of varbinds) {
          let masOid = objID.oid.split('.');
          if (masOid[10] > 5000){
            let portg = parseInt(port) + 2082476032;
            res = portg.toString()
          }
          if (masOid[13] == port || masOid[13] == res) {
            result.vlan += objID.value
           // console.log(objID.value.toString('utf8'))
          }
        }
      }
      // bind linksys
      const fCbBindingLinksys = (varbinds: any) => {
        for (let objID of varbinds) {
          let masOid = objID.oid.split('.');
          let ip = ''
          let lease = ''
          let mac = ''
          let int = ''
          let type = ''
        for (let i = 14; i < masOid.length; i++) {        
          let oidMac = parseInt(masOid[i]).toString(16);
          if (oidMac.length == 1)
            oidMac = "0" + oidMac;
            mac += oidMac;
        }
          setTimeout(() => {
            if (result.macAddr === mac) {
              if(masOid[12] == 3){
                type += objID.value
              }
              if(masOid[12] == 4){
                lease += objID.value
              }
              if(masOid[12] == 5){ 
                ip += objID.value
              }
              if(masOid[12] == 6){
                int += objID.value
              }
              result.binding.ip += ip
              result.binding.lease += lease
              result.binding.type += type
              result.binding.int += int
            }
          }, 2000)
        }
      }
      //cabletest linksys
      const fCbAny = (varbinds: any) => {
        for (let objID of varbinds) {
          let masOid = objID.oid.split('.');
          console.log(masOid[13])
          if (masOid[13] == port){
            console.log(objID)
          }
          
        }
      }

      const doneCb = (err: string) => {
        if (err) {
          console.log('error: ', err)
          session.close();
        }
      }

      setTimeout(() => {
        return resolve(result)
      }, 5000)

      session.subtree("1.3.6.1.2.1.2.2.1.5", fCbSpeed, doneCb)
      session.subtree("1.3.6.1.2.1.2.2.1.7", fCbAdmSt, doneCb)
      session.subtree("1.3.6.1.2.1.2.2.1.8", fCbPhySt, doneCb)
      session.subtree("1.3.6.1.2.1.17.7.1.2.2.1.2", fCbMac, doneCb)
      session.subtree("1.3.6.1.2.1.31.1.1.1.18", fCbDescr, doneCb)
      session.subtree("1.3.6.1.2.1.17.7.1.4.5.1.1", fCbVlan, doneCb)
      session.subtree("1.3.6.1.4.1.3955.89.112.1.11.1", fCbBindingLinksys, doneCb)
      session.subtree("1.3.6.1.4.1.171.12.58.1.1.1", fCbAny, doneCb)
     // .1.3.6.1.2.1.16.1.1.1.18.14
    })
  }
}

//1.3.6.1.2.1.10.7.2.1.3. fcs err/ crc
//1.3.6.1.2.1.10.7.2.1.16. MAC Rx Errors
//1.3.6.1.2.1.10.7.2.1.19 link duplex 2-half  3-full 1-nolink
//1.3.6.1.2.1.10.7.2.1.9 collision err
//1.3.6.1.2.1.10.7.2.1.18 symbol err
//1.3.6.1.2.1.31.1.1.1.18 gerkon linksys

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