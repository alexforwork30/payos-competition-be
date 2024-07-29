import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { PayOsModule } from 'src/shared/pay-os/pay-os.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [PrismaModule, PayOsModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
