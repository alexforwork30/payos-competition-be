import { Injectable } from '@nestjs/common';
import {
  PAY_OS_API_KEY,
  PAY_OS_CHECK_SUM_KEY,
  PAY_OS_CLIENT_ID,
} from 'src/config';
const PayOS = require('@payos/node');

@Injectable()
export class PayOsService {
  public readonly client;

  constructor() {
    this.client = new PayOS(
      PAY_OS_CLIENT_ID,
      PAY_OS_API_KEY,
      PAY_OS_CHECK_SUM_KEY,
    );
  }
}
