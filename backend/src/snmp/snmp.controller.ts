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
      async getSnmp(@Req() req: Request, @Res() res: Response) {
        // const body = {
        //     ip: req.body.ip,
        //     sw: req.body.sw
        // }
         const ip: string = req.body.ip
         const sw: string = req.body.sw
         // console.log(ip)
        // console.log(res)
        // console.log(sw)
         await this.snmpService.getSnmp(ip, sw).then((data) => { return res.jsonp(data) })
      
     
        // console.log('link: ' + speed)
        // return setTimeout(() =>{res.json(data)}, 10000) }
        
    }


    // @Post()
    //     async findAll(@Body() snmpDto: SnmpDto){
    //         console.log(snmpDto)
    //         // const ip = body.ip
    //         // const sw = body.sw
    //         // console.log(ip)
    //          return this.snmpService.findAll(snmpDto)
    //     }
    // "172.17.4.11", "74FRfR7ewJar"

    // @Get()
    // getOne(@Param('link') link: string): string {
    //     return 'link ' + link

    // }


}
