import { Controller, Req, Res, Post} from '@nestjs/common';
import { CheckRaisecomGService } from './checkRaisecomG.service';
import { Request, Response } from 'express';


@Controller('/checkraisecomg')
export class CheckRaisecomGController {
    constructor(private checkRaisecomGService: CheckRaisecomGService) { }
//incoming request and return response
    @Post()
     async baseCheckRaisecomG(@Req() req: Request, @Res() res: Response){
         const ip: string = req.body.sw
         const port: string = req.body.port
           console.log('backSw', ip)
           console.log('backMac', port) 
      //console.log('res',this.checkZteService.baseCheckZte(ip, port) )
        let result = await this.checkRaisecomGService.baseCheckRaisecomG(ip, port) 
       // console.log('resultController',res.json(result))
        return res.json(result)
      }  
}
