import { Module } from '@nestjs/common';
import { PayOsService } from './pay-os.service';

@Module({
  providers: [PayOsService],
  exports: [PayOsService],
})
export class PayOsModule {}
