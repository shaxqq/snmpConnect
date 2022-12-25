import { result } from '../dto/snmp.dto'

// binding graisecom 
export const bindingGRaisecom = (varbinds: any) => {
    for (let objID of varbinds) {
        let masOid = objID.oid.split('.');
        let ip = ''
        let int = ''

        if (masOid[14] == 5) {
            int = objID.value
        }
        // setTimeout(() => {
            if (masOid[14] == 3 && result.binding.ip == objID.oid.slice(36)) {
                result.binding.lease = objID.value
            }
        // }, 1000)

        if (int > '5000') {
            let portg = parseInt(result.port) + 2082476032;
            result.portG = portg.toString()
            if (int == result.portG) {
                for (let i = 16; i < masOid.length; i++) {
                    ip += masOid[i] + '.'
                }
                result.binding.ip = ip.slice(0, -1)
                result.binding.type = '1'
                result.binding.int = (parseInt(int) - 2082476032).toString()
            }
        }
    }
}