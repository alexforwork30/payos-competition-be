import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { PaymentLinkDataType } from '@payos/node/lib/type';
import { OrderService } from './order.service';
import { OrderCreateReq } from './request/order-create.request';
import { OrderCreateRes } from './response/order-create.response';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() payload: OrderCreateReq): Promise<OrderCreateRes> {
    return this.orderService.createOrder(payload);
  }

  @Get(':orderId')
  async getOrder(
    @Req() req: Request,
    @Param('orderId') orderId: string,
  ): Promise<PaymentLinkDataType | null> {
    const token = req.headers['order-token'];
    return this.orderService.getOrder(orderId, token);
  }

  @Get(':orderId/download')
  async downloadOrder(
    @Req() req: Request,
    @Param('orderId') orderId: string,
  ): Promise<string> {
    const token = req.headers['order-token'];
    return this.orderService.downloadOrder(orderId, token);
  }

  @Delete(':orderId/:cancellationReason')
  async cancelOrder(
    @Param('orderId') orderId: string,
    @Param('cancellationReason') cancellationReason: string,
  ): Promise<PaymentLinkDataType> {
    return this.orderService.cancelOrder(orderId, cancellationReason);
  }
}
