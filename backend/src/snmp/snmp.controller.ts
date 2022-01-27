import { Controller, Get, Req, Res, HttpStatus, Post, Body } from '@nestjs/common';
// import { GetSnmpDto } from './dto/get.snmp.dto';
import { SnmpService } from './snmp.service';
//import { Snmp } from './interfaces/snmp.interface';
import { Request, Response } from 'express';
// import { SnmpDto } from './dto/snmp.dto';


@Controller('/snmp')
export class SnmpController {
    constructor(private snmpService: SnmpService) { }


    @Post()
       getSnmp(@Req() req: Request, @Res() res: Response) {
         const sw: string = req.body.sw
         const port: string = req.body.port
          this.snmpService.getSnmp(sw, port).then((data) => { return res.json( data ) }
          )
    } 
}
