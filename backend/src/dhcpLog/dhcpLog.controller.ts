import { Controller, Get, Param } from '@nestjs/common';
import { DhcpLogService } from './dhcpLog.service';

@Controller('/dhcplog')
export class DhcpLogController {
    constructor(private dhcpLogService: DhcpLogService) { }

    @Get('/:dhcpIp/:macSrc')
    async dhcpLog(@Param('dhcpIp') dhcpIp: string, @Param('macSrc') macSrc: string) {
        console.log('backSw', dhcpIp);
        console.log('backMac', macSrc);

        return new Promise((resolve, reject) => {
            try {
                this.dhcpLogService.dhcpLog(dhcpIp, macSrc, (data: any) => {
                    console.log('dataController', data);
                    resolve(data); 
                });
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    }
}