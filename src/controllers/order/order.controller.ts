import { Body, Controller, Post } from '@nestjs/common';
import { CheckoutResponseDataType } from '@payos/node/lib/type';
import { OrderService } from './order.service';
import { OrderCreateReq } from './request/order-create.request';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body() payload: OrderCreateReq,
  ): Promise<CheckoutResponseDataType> {
    return this.orderService.createPaymentLink(payload);
  }
}
