import { Controller, Req, Res, Post} from '@nestjs/common';
import { CheckService } from './check.service';
import { Request, Response } from 'express';


@Controller('/check')
export class CheckController {
    constructor(private checkService: CheckService) { }
//incoming request and return response
    @Post()
     async baseCheck(@Req() req: Request, @Res() res: Response){
         const ip: string = req.body.sw
         const port: string = req.body.port
           console.log('backSw', ip)
           console.log('backMac', port) 
  
        let result = await this.checkService.baseCheck(ip, port) 
        return res.json(result)
      }  
}
