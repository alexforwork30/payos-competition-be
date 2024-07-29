import { Injectable } from '@nestjs/common';
import {
  CheckoutRequestType,
  CheckoutResponseDataType,
} from '@payos/node/lib/type';
import { PaymentStatus } from '@prisma/client';
import { UI_BASE_URL } from 'src/config';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { PayOsService } from 'src/shared/pay-os/pay-os.service';
import { v4 as uuidv4 } from 'uuid';
import { OrderCreateReq } from './request/order-create.request';

@Injectable()
export class OrderService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly payOsService: PayOsService,
  ) {}

  async createPaymentLink(
    payload: OrderCreateReq,
  ): Promise<CheckoutResponseDataType> {
    const payment: CheckoutRequestType = {
      ...payload,
      orderCode: Math.floor(Math.random() * 1000000),
      returnUrl: UI_BASE_URL,
      cancelUrl: UI_BASE_URL,
      expiredAt: Math.floor(Date.now() / 1000) + 3600,
    };
    const token = uuidv4();
    await this.prismaService.payment.create({
      data: {
        token,
        orderCode: payment.orderCode,
        amount: payment.amount,
        status: PaymentStatus.PENDING,
      },
    });
    return this.payOsService.client.createPaymentLink(payment);
  }
}
