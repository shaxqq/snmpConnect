import { Controller, Req, Res, Post} from '@nestjs/common';
import { CheckDlinkService } from './checkDlink.service';
import { Request, Response } from 'express';


@Controller('/checkdlink')
export class CheckDlinkController {
    constructor(private checkDlinkService: CheckDlinkService) { }
//incoming request and return response
    @Post()
     async baseCheckDlink(@Req() req: Request, @Res() res: Response){
         const ip: string = req.body.sw
         const port: string = req.body.port
           console.log('backSw', ip)
           console.log('backMac', port) 
      //console.log('res',this.checkZteService.baseCheckZte(ip, port) )
        let result = await this.checkDlinkService.baseCheckDlink(ip, port) 
       // console.log('resultController',res.json(result))
        return res.json(result)
      }  
}
