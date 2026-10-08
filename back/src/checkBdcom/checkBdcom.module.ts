import { Module } from '@nestjs/common';
import { CheckBdcomController } from './checkBdcom.controller';
import { CheckBdcomService } from './checkBdcom.service';

@Module({
  imports: [],
  controllers: [CheckBdcomController],
  providers: [CheckBdcomService],
})
export class SnmpModule {}


