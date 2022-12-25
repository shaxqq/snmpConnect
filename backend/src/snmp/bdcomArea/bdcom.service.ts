import { result } from '../dto/snmp.dto'

export const bindingBdcom = (varbinds: any) =>{
    for (let objID of varbinds) {
        let masOid = objID.oid.split('.');
        let mac = ''
        let oidMac = ( (masOid[12]>>>24) +'.' + (masOid[12]>>16 & 255) +'.' + (masOid[12]>>8 & 255) +'.' + (masOid[12] & 255) );
        console.log('oidMac',oidMac)

        if(masOid[12] == '1682144518'){
            console.log(objID.value)
        }
        setTimeout(() => {
                   if (result.macAddr == mac) {
                    if(masOid[11] == 1){
                        console.log('objOid', objID.value)
                    }
                   }},5000)
    }
}