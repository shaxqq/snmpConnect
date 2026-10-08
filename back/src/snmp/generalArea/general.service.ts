import { result } from '../dto/snmp.dto'

// speed
export const speedPort = (varbinds: any) => {
    for (let objID of varbinds) {
        let masOid = objID.oid.split('.');
        if (masOid[10] > 5000) {
            let portg = parseInt(result.port) + 2082476032;
            result.portG = portg.toString()
        }
        if (masOid[10] == result.port || (masOid[10]) == result.portG) {
            console.log(objID.value)
            result.speed = objID.value.toString()
        }
    }
}

// admin status
export const admStPort = (varbinds: any) => {
    for (let objID of varbinds) {
        let masOid = objID.oid.split('.');
        if (masOid[10] > 5000) {
            let portg = parseInt(result.port) + 2082476032;
            result.portG = portg.toString()
        }
        if (masOid[10] == result.port || (masOid[10]) == result.portG) {
            result.adminSt = objID.value
        }
    }
}

// physical status
export const phyStPort = (varbinds: any) => {
    for (let objID of varbinds) {
        let masOid = objID.oid.split('.');
        if (masOid[10] > 5000) {
            let portg = parseInt(result.port) + 2082476032;
            result.portG = portg.toString()
        }
        if (masOid[10] == result.port || (masOid[10]) == result.portG) {
            result.linkSt = objID.value
        }
    }
}

// mac
export const macPort = (varbinds: any) => {
    for (let objID of varbinds) {
        let masOid = objID.oid.split('.');
        let mac = '';
        if (masOid[10] > 5000) {
            let portg = parseInt(result.port) + 2082476032;
            result.portG = portg.toString()
        }
        if (objID.value == result.port || objID.value == result.portG && objID.value > 0) {
            for (let i = 14; i < masOid.length; i++) {
                let oidMac = parseInt(masOid[i]).toString(16);
                if (oidMac.length == 1)
                    oidMac = "0" + oidMac;
                mac += oidMac;
            }
            result.macAddr = mac
        }
    }
}

// description
export const descrPort = (varbinds: any) => {
    for (let objID of varbinds) {
        let masOid = objID.oid.split('.');
        // console.log('des',masOid)
        if (masOid[10] > 5000) {
            let portg = parseInt(result.port) + 2082476032;
            result.portG = portg.toString()
        }
        if (masOid[11] == result.port || masOid[11] == result.portG) {
            result.description = objID.value.toString('utf8')
        }
    }
}

// vlan
export const vlanPort = (varbinds: any) => {
    for (let objID of varbinds) {
        let masOid = objID.oid.split('.');
        console.log('vlan',masOid)
        if (masOid[10] > 5000) {
            let portg = parseInt(result.port) + 2082476032;
            result.portG = portg.toString()
        }
         setTimeout(() => {
            if (masOid[13] == result.port || masOid[13] == result.portG) {
                result.vlan = objID.value
            }
         }, 1000)
    }
}

 // error
 export const errorPort = (varbinds: any) => {
    for (let objID of varbinds) {
      let masOid = objID.oid.split('.');
      console.log('err',masOid)
    if (masOid[10] > 5000) {
        let portg = parseInt(result.port) + 2082476032;
        result.portG = portg.toString()
    }
      setTimeout(() => {
        if (masOid[10] == 3 && masOid[11] == result.port) {
            result.err.fcs = objID.value
        }
        if (masOid[10] == 9 && masOid[11] == result.port) {
            result.err.collision = objID.value
        } 
        if (masOid[10] == 16 && masOid[11] == result.port) {
            result.err.macEr = objID.value
        } 
        if (masOid[10] == 18 && masOid[11] == result.port) {
            result.err.symbol = objID.value
        }
      }, 1000)
    }
  }