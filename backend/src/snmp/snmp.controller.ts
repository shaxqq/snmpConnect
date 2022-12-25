import { Controller, Req, Res, Post} from '@nestjs/common';
import { SnmpService } from './snmp.service';
import { Request, Response } from 'express';


@Controller('/snmp')
export class SnmpController {
    constructor(private snmpService: SnmpService) { }

    @Post()
      getSnmp(@Req() req: Request, @Res() res: Response){
         const sw: string = req.body.sw
         const port: string = req.body.port
         this.snmpService.getSnmp(sw, port).then((data) => { 
          return res.json(data) 
        
        })
      }
}