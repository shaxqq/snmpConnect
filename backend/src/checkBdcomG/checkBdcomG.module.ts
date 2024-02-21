import { Module } from '@nestjs/common';
import { CheckBdcomGController } from './checkBdcomG.controller';
import { CheckBdcomGService } from './checkBdcomG.service';

@Module({
  imports: [],
  controllers: [CheckBdcomGController],
  providers: [CheckBdcomGService],
})
export class SnmpModule {}


