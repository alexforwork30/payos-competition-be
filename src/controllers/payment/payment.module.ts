import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { PayOsModule } from 'src/shared/pay-os/pay-os.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [PrismaModule, PayOsModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
