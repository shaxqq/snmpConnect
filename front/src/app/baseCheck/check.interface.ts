export class Check {
    constructor(public sw: string, public port: string) { }
        getSw() {
            let patternMac = new RegExp('(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')
            let inpSw = this.sw
            let res = ''
            console.log(inpSw)
            if (inpSw != undefined && inpSw.length === 0) {
              return alert("Добавьте свитч");
              } else  {
                let currentIp = inpSw.match(patternMac)
                console.log(currentIp)
                if(currentIp != null){
                    res = currentIp[0]
                }
            //    console.log(res)
                return res
              }
        }
}
