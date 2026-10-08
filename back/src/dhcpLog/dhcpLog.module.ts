import { Module } from '@nestjs/common';
import { DhcpLogController } from './dhcpLog.controller';
import { DhcpLogService } from './dhcpLog.service';

@Module({
  imports: [],
  controllers: [DhcpLogController],
  providers: [DhcpLogService],
})
export class DhcpLogModule {}


