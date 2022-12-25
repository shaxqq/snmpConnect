import { result } from '../dto/snmp.dto'

// binding linksys
export const bindingLinksys = (varbinds: any) => {
    
    for (let objID of varbinds) {
        let masOid = objID.oid.split('.');
        let mac = ''
        for (let i = 14; i < masOid.length; i++) {
            let oidMac = parseInt(masOid[i]).toString(16);
            if (oidMac.length == 1)
                oidMac = "0" + oidMac;
            mac += oidMac;
        }    

         setTimeout(() => {
        if (result.macAddr == mac) {
            if (masOid[12] == 3) {
                console.log(objID.value)
                result.binding.type = objID.value == 1 ? ' learned' : ' static'
            }
            if (masOid[12] == 4) {
                console.log(objID.value)
                result.binding.lease = objID.value
            }
            if (masOid[12] == 5) {
                console.log(objID.value)
                result.binding.ip = objID.value
            }
            if (masOid[12] == 6) {
                console.log(objID.value)
                result.binding.int = objID.value
            }
        }
         }, 4000)
    }
}
