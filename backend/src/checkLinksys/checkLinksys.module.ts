import { Module } from '@nestjs/common';
import { CheckLinksysController } from './checkLinksys.controller';
import { CheckLinksysService } from './checkLinksys.service';

@Module({
  imports: [],
  controllers: [CheckLinksysController],
  providers: [CheckLinksysService],
})
export class SnmpModule {}


