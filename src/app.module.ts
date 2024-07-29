import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './controllers/payment/payment.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { AuthModule } from './controllers/auth/auth.module';
import { FirebaseModule } from './database/firebase/firebase.module';

@Module({
  imports: [PaymentModule, PrismaModule, AuthModule, FirebaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
