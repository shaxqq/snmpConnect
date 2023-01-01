import { Controller, Req, Res, Post} from '@nestjs/common';
import { ScanService } from './scan.service';
import { Request, Response } from 'express';


@Controller('/scan')
export class ScanController {
    constructor(private scanService: ScanService) { }
//incoming request and return response
    @Post()
     async macScan(@Req() req: Request, @Res() res: Response){
         const switches: any = req.body.switches
         const macSrc: string = req.body.macSrc
           console.log('backSw', switches)
           console.log('backMac', macSrc) 
       let swPort = []    
        for (let ip of switches){
         let result = await this.scanService.macScan(ip, macSrc) 
         swPort.push(result)
        }
 
        for(let i=0; i< swPort.length; i++){
          if(swPort[i].includes('getaddrinfo') || swPort[i].includes('RequestTimedOutError')){
            swPort[i] = ''
          }
        }
        console.log(swPort)
        return res.json(swPort)
      }  
}
