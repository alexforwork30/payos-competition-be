import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderCreateReq {
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  description: string;
}
