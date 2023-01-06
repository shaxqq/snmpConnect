import { Injectable } from '@nestjs/common';
let snmp = require("net-snmp");

@Injectable()
export class ScanService {
     macScan(ip: any, macSrc: string) {
        return new Promise((resolve, reject) => {
            
            try {
                let resultScan = '';
                let swVersion = '';
                let session = snmp.createSession(ip, '74FRfR7ewJar');     

                  //get sw version for bdcom
                  session.get(["1.3.6.1.2.1.1.1.0"], function(err:any, varbinds:any){
                    if (err) {
                        console.error (err.toString ());
                    } else {
                            for (let objID of varbinds) {
                                swVersion = objID.value.toString('utf8')
                            }
                    }
                });
             //   console.log('swverNot func',swVersion)
                function scanPort(varbinds: any) {
                    for (let objID of varbinds) {
                        let masOid = objID.oid.split('.');
                        let mac = '';
                        for (let i = 14; i < masOid.length; i++) {
                            let oidMac = parseInt(masOid[i]).toString(16);
                            if (oidMac.length == 1)
                                oidMac = "0" + oidMac;
                            mac += oidMac;
                        }
                        if (mac == macSrc) {
                            let oidPort = parseInt(objID.value) 
                            let oidPortPon = objID.value                   
                            if (oidPort > 5000)
                            oidPort -= 2082476032;
                            resultScan = oidPort.toString()
                            
                            //scan pon port
                            if(swVersion.includes('BDCOM')){
                                function scanPonPort(varbinds:any): void{
                                    for (let objID of varbinds) {
                                        let masOid = objID.oid.split('.');
                                        if(oidPortPon == masOid[10]){
                                            console.log('resObj',objID.value.toString('utf8'))
                                            resultScan = objID.value.toString('utf8')
                                        } 
                                    }
                                }
                                session.subtree("1.3.6.1.2.1.2.2.1.2", scanPonPort, doneCallback);
                            }  

                        }                  
                    }                    
                }

                function doneCallback(error: any) {
                    if (error) 
                        resultScan = 'err' + ip + ' : ' + error.toString();
                      //  session.close();
                        setTimeout(() => {
                            console.log('resultScanTimeout', resultScan)
                            return resolve(ip + ' : ' + resultScan)
                          }, 2000)
                }

                session.subtree("1.3.6.1.2.1.17.7.1.2.2.1.2", scanPort, doneCallback);
            }
            catch (err) {
                reject(err);
            }
        })
    }
}
