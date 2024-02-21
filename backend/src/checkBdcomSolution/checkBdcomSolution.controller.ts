import { Controller, Req, Res, Post} from '@nestjs/common';
import { CheckBdcomSolutionService } from './checkBdcomSolution.service';
import { Request, Response } from 'express';


@Controller('/checkbdcomsolution')
export class CheckBdcomSolutionController {
    constructor(private checkBdcomSolutionService: CheckBdcomSolutionService) { }
//incoming request and return response
    @Post()
     async baseCheckBdcomSolution(@Req() req: Request, @Res() res: Response){
         const ip: string = req.body.sw
         const port: string = req.body.port
           console.log('backSw', ip)
           console.log('backMac', port) 
      //console.log('res',this.checkZteService.baseCheckZte(ip, port) )
        let result = await this.checkBdcomSolutionService.baseCheckBdcomSolution(ip, port) 
       // console.log('resultController',res.json(result))
        return res.json(result)
      }  
}
