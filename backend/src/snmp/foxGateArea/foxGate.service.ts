import { result } from '../dto/snmp.dto'

export const bindingFoxGate = (varbinds: any) =>{
    for (let objID of varbinds) {
        let masOid = objID.oid.split('.');
        let mac = ''
        for (let i = 14; i < masOid.length; i++) {
            let oidMac = parseInt(masOid[i]).toString(16);
            if (oidMac.length == 1)
                oidMac = "0" + oidMac;
            mac += oidMac;
        } 
        console.log(objID.value.toString('utf8'))
        //console.log(mac)

        // setTimeout(() => {
        //        if (result.macAddr == mac) {
        //            if (masOid[13] == 6) {
        //                console.log(objID.value)
        //                result.binding.type = objID.value == 2 ? ' learned' : ' static'
        //            }
        //            if (masOid[13] == 5) {
        //                console.log(objID.value)
        //                result.binding.lease = objID.value.toString('utf8')
        //            }
        //            if (masOid[13] == 2) {
        //                console.log(objID.value)
        //                result.binding.ip = objID.value
        //            }
        //            if (masOid[13] == 4) {
        //                console.log(objID.value)
        //                result.binding.int = objID.value
        //            }
        //            if (masOid[13] == 3) {
        //                 console.log(objID.value)
        //                 result.vlan = objID.value
        //         }
        //        }
        //         }, 5000)
      
     //  console.log('binding zte', objID)
    }
}