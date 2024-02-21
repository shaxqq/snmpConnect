export class DhcpLog {
  constructor(public dhcpIp: string = '10.110.0.4', public mac: string = '') {}

  getMac(mac: string): string | undefined {
    mac = mac.toLowerCase().replace(/[^a-f0-9]/g, '');
    if (mac.length !== 12) {
      // Возвращаем undefined, если MAC-адрес неверный
      return undefined;
    }
    return mac;
  }
}
// export class Scan {
//     constructor(public switches: any, public macSrc: string) { }

//     getMac(macSrc: string) {
//         macSrc = macSrc.toLocaleLowerCase();
//         let res = '';
//         let macValid = true;
//         for (let i = 0; i < macSrc.length; i++) {
//             if ((macSrc.charCodeAt(i) >= 97 && macSrc.charCodeAt(i) <= 102) || (macSrc.charCodeAt(i) >= 48 && macSrc.charCodeAt(i) <= 57)) {
//                 res += macSrc[i];
//                 continue;
//             }
//             macValid = !(macSrc.charAt(i) == ':' || macSrc.charAt(i) == '.' || macSrc.charAt(i) == '-');
//         }
//         macValid = res.length === 12;
//         return macValid ? res : alert('не верный MAC');
//     }

//     getSwitches() {
//         let patternSw = new RegExp('(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')
//         let res = [];
//         let str = this.switches
//        // let ips = str.match(patternSw);
//         if (str != undefined && str.length === 0) {
//       alert("Добавьте свитчи");
//     } else  {
//        let ips = str.match(patternSw);
//        while(ips != null)
//         {
//             res.push(ips[0]);
//             str = str.substr(ips.index + ips[0].length);
//             ips = str.match(patternSw);
//         }
//         for(let i = 0; i < res.length; i++)
//         {
//             if(!res[i].includes('.')){
//                 res.splice(i, 1);
//             }
//         }
//     }
//         return res;
//         }
// }
