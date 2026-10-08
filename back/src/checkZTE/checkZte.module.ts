import { Module } from '@nestjs/common';
import { CheckZteController } from './checkZte.controller';
import { CheckZteService } from './checkZte.service';

@Module({
  imports: [],
  controllers: [CheckZteController],
  providers: [CheckZteService],
})
export class SnmpModule {}


