import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './controllers/order/order.module';
import { FirebaseModule } from './database/firebase/firebase.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { PayOsModule } from './shared/pay-os/pay-os.module';

@Module({
  imports: [PrismaModule, FirebaseModule, OrderModule, PayOsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
