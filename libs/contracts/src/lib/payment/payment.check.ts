import { PurchaseState } from '@purple/interfaces';
import { IsEmail, IsString } from 'class-validator';
export namespace PaymentCheck {
  export const topic = 'payment.check.query';

  export class Request {
    @IsEmail()
    courseId: string;

    @IsString()
    userId: string;
  }

  export class Response {
    status: 'canceled' | 'success' | 'progress';
  }
}
