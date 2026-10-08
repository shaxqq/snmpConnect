import { Controller, Req, Res, Post} from '@nestjs/common';
import { CheckBdcomService } from './checkBdcom.service';
import { Request, Response } from 'express';


@Controller('/checkbdcom')
export class CheckBdcomController {
    constructor(private checkBdcomService: CheckBdcomService) { }
//incoming request and return response
    @Post()
     async baseCheckBdcom(@Req() req: Request, @Res() res: Response){
         const ip: string = req.body.sw
         const port: string = req.body.port
           console.log('backSw', ip)
           console.log('backMac', port) 
      //console.log('res',this.checkZteService.baseCheckZte(ip, port) )
        let result = await this.checkBdcomService.baseCheckBdcom(ip, port) 
       // console.log('resultController',res.json(result))
        return res.json(result)
      }  
}
