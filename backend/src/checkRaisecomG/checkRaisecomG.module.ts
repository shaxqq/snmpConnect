import { Module } from '@nestjs/common';
import { CheckRaisecomGController } from './checkRaisecomG.controller';
import { CheckRaisecomGService } from './checkRaisecomG.service';

@Module({
  imports: [],
  controllers: [CheckRaisecomGController],
  providers: [CheckRaisecomGService],
})
export class SnmpModule {}


