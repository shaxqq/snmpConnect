import { Module } from '@nestjs/common';
import { CheckDlinkController } from './checkDlink.controller';
import { CheckDlinkService } from './checkDlink.service';

@Module({
  imports: [],
  controllers: [CheckDlinkController],
  providers: [CheckDlinkService],
})
export class SnmpModule {}


