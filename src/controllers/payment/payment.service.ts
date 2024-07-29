import { Injectable } from '@nestjs/common';
import { WebhookType } from '@payos/node/lib/type';
import { PayOsService } from 'src/shared/pay-os/pay-os.service';

@Injectable()
export class PaymentService {
  constructor(private readonly payOsService: PayOsService) {}

  async paymentWebhook(payload: WebhookType): Promise<void> {
    const webhook = this.payOsService.client.verifyPaymentWebhookData(payload);
  }

  async test() {
    const a = await this.payOsService.client.confirmWebhook(
      'https://payos-competition-be.onrender.com/payment/payos',
    );
    console.log(a);
  }
}
