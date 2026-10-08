import { Controller, Req, Res, Post} from '@nestjs/common';
import { CheckBdcomGService } from './checkBdcomG.service';
import { Request, Response } from 'express';


@Controller('/checkbdcomg')
export class CheckBdcomGController {
    constructor(private checkBdcomGService: CheckBdcomGService) { }
//incoming request and return response
    @Post()
     async baseCheckBdcomG(@Req() req: Request, @Res() res: Response){
         const ip: string = req.body.sw
         const port: string = req.body.port
           console.log('backSw', ip)
           console.log('backMac', port) 
      //console.log('res',this.checkZteService.baseCheckZte(ip, port) )
        let result = await this.checkBdcomGService.baseCheckBdcomG(ip, port) 
       // console.log('resultController',res.json(result))
        return res.json(result)
      }  
}
