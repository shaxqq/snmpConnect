import { Controller, Req, Res, Post} from '@nestjs/common';
import { SnmpService } from './snmp.service';
import { Request, Response } from 'express';
import { error } from 'console';


@Controller('/snmp')
export class SnmpController {
    constructor(private snmpService: SnmpService) { }

    @Post()
      getSnmp(@Req() req: Request, @Res() res: Response){
         const sw: string = req.body.sw
         const port: string = req.body.port
          // console.log('sw',sw)
          // console.log('port',port)
          this.snmpService.getSnmp(sw, port).then((data) => { 
          return res.json(data) 
        })        
      }
}