import { Controller, Req, Res, Post} from '@nestjs/common';
import { CheckLinksysService } from './checkLinksys.service';
import { Request, Response } from 'express';


@Controller('/checklinksys')
export class CheckLinksysController {
    constructor(private checkLinksysService: CheckLinksysService) { }
//incoming request and return response
    @Post()
     async baseCheckLinksys(@Req() req: Request, @Res() res: Response){
         const ip: string = req.body.sw
         const port: string = req.body.port
           console.log('backSw', ip)
           console.log('backMac', port) 
      //console.log('res',this.checkZteService.baseCheckZte(ip, port) )
        let result = await this.checkLinksysService.baseCheckLinksys(ip, port) 
       // console.log('resultController',res.json(result))
        return res.json(result)
      }  
}
