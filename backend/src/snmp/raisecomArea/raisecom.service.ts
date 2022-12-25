import { result } from '../dto/snmp.dto'

//binding raisecom
export const bindingRaisecom = (varbinds: any) => {
    for (let objID of varbinds) {
        let masOid = objID.oid.split('.');
        let ip = ''
        let int = ''
        if (masOid[14] == 5) {
            int = objID.value
        }
        // setTimeout(() => {
            if (masOid[14] == 3 && result.binding.ip == objID.oid.slice(34)) {
                result.binding.lease = objID.value
            }
        // }, 1000)

        if (int < '5000') {
            if (int == result.port) {
                for (let i = 15; i < masOid.length; i++) {
                    ip += masOid[i] + '.'
                }
                result.binding.ip = ip.slice(0, -1)
                result.binding.type = '1'
                result.binding.int = int
            }
        }
    }

}