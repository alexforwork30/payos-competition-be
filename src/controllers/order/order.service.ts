import { Injectable } from '@nestjs/common';
import {
  CheckoutRequestType,
  CheckoutResponseDataType,
  PaymentLinkDataType,
} from '@payos/node/lib/type';
import { UI_BASE_URL } from 'src/config';
import { ORDER_DOWNLOAD_LINK } from 'src/constants/order.constants';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { PayOsService } from 'src/shared/pay-os/pay-os.service';
import { v4 as uuidv4 } from 'uuid';
import { OrderCreateReq } from './request/order-create.request';
import { OrderCreateRes } from './response/order-create.response';
@Injectable()
export class OrderService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly payOsService: PayOsService,
  ) {}

  async createOrder(payload: OrderCreateReq): Promise<OrderCreateRes> {
    const order: CheckoutRequestType = {
      ...payload,
      orderCode: Math.floor(Math.random() * 1000000),
      returnUrl: UI_BASE_URL,
      cancelUrl: UI_BASE_URL,
      expiredAt: Math.floor(Date.now() / 1000) + 3600,
    };
    const paymentLink: CheckoutResponseDataType =
      await this.payOsService.client.createPaymentLink(order);
    const token = uuidv4();
    await this.prismaService.order.create({
      data: {
        token,
        paymentLinkId: paymentLink?.paymentLinkId,
        amount: paymentLink?.amount,
      },
    });
    return { paymentLink, token };
  }

  async getOrder(
    orderId: string,
    token: string,
  ): Promise<PaymentLinkDataType | null> {
    if (orderId) {
      const order =
        await this.payOsService.client.getPaymentLinkInformation(orderId);
      return order;
    }
    const storedOrder = await this.prismaService.order.findUnique({
      where: {
        token,
      },
    });
    if (!storedOrder) {
      return null;
    }
    const order = await this.payOsService.client.getPaymentLinkInformation(
      storedOrder.paymentLinkId,
    );
    return order;
  }

  async cancelOrder(
    orderId: string,
    cancellationReason: string,
  ): Promise<PaymentLinkDataType> {
    const order = await this.payOsService.client.cancelPaymentLink(
      orderId,
      cancellationReason,
    );
    return order;
  }

  async downloadOrder(orderId: string, token: string): Promise<string> {
    const order = await this.getOrder(orderId, token);
    if (!order) {
      throw new Error('Order not found');
    }
    if (order.status !== 'PAID') {
      throw new Error('Order not paid');
    }
    return ORDER_DOWNLOAD_LINK;
  }
}
