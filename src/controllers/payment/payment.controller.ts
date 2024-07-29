import { Body, Controller, Post } from '@nestjs/common';
import { CheckoutResponseDataType, WebhookType } from '@payos/node/lib/type';
import { PaymentService } from './payment.service';
import { PaymentLinkCreateReq } from './request/payment-link-create.request';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-payment-link')
  async createPaymentLink(
    @Body() payload: PaymentLinkCreateReq,
  ): Promise<CheckoutResponseDataType> {
    return this.paymentService.createPaymentLink(payload);
  }

  @Post('payment-webhook')
  async paymentWebhook(@Body() payload: WebhookType): Promise<void> {
    return this.paymentService.paymentWebhook(payload);
  }
}
