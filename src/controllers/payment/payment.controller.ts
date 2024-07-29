import { Body, Controller, Get, Post } from '@nestjs/common';
import { WebhookType } from '@payos/node/lib/type';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('payos')
  async paymentWebhook(@Body() payload: WebhookType): Promise<void> {
    return this.paymentService.paymentWebhook(payload);
  }

  @Get('test')
  async test() {
    return this.paymentService.test();
  }
}
