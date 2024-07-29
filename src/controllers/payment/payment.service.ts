import { Injectable } from '@nestjs/common';
import PayOS from '@payos/node';
import {
  CheckoutRequestType,
  CheckoutResponseDataType,
} from '@payos/node/lib/type';
import { PaymentStatus } from '@prisma/client';
import { UI_BASE_URL } from 'src/config';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { PaymentLinkCreateReq } from './request/payment-link-create.request';
// const PayOS = require('@payos/node');
// import PayOS from '@payos/node';

@Injectable()
export class PaymentService {
  private readonly payOSClient: PayOS;

  constructor(private readonly prismaService: PrismaService) {
    this.payOSClient = new PayOS(
      'PAY_OS_CLIENT_ID',
      'PAY_OS_API_KEY',
      'PAY_OS_CHECK_SUM_KEY',
    );
  }

  async createPaymentLink(
    payload: PaymentLinkCreateReq,
  ): Promise<CheckoutResponseDataType> {
    const payment: CheckoutRequestType = {
      ...payload,
      orderCode: Math.floor(Math.random() * 1000000),
      returnUrl: UI_BASE_URL,
      cancelUrl: UI_BASE_URL,
      expiredAt: Math.floor(Date.now() / 1000) + 300,
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
    return this.payOSClient.createPaymentLink(payment);
  }
}
