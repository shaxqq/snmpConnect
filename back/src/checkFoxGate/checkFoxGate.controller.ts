import { Controller, Req, Res, Post} from '@nestjs/common';
import { CheckFoxGateService } from './checkFoxGate.service';
import { Request, Response } from 'express';


@Controller('/checkfoxgate')
export class CheckFoxGateController {
    constructor(private checkFoxGateService: CheckFoxGateService) { }
//incoming request and return response
    @Post()
     async baseCheckFoxGate(@Req() req: Request, @Res() res: Response){
         const ip: string = req.body.sw
         const port: string = req.body.port
           console.log('backSw', ip)
           console.log('backMac', port) 
      //console.log('res',this.checkZteService.baseCheckZte(ip, port) )
        let result = await this.checkFoxGateService.baseCheckFoxGate(ip, port) 
       // console.log('resultController',res.json(result))
        return res.json(result)
      }  
}
