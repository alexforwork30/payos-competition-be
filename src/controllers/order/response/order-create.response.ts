import { CheckoutResponseDataType } from '@payos/node/lib/type';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class OrderCreateRes {
  @Expose()
  @IsObject()
  paymentLink: CheckoutResponseDataType;

  @Expose()
  @IsString()
  @IsNotEmpty()
  token: string;
}
