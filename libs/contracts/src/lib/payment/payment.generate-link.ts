import { IsEmail, IsNumber, IsString } from 'class-validator';
export namespace PaymentGenerateLink {
  export const topic = 'payment.generate-link.command';

  export class Request {
    @IsEmail()
    courseId: string;

    @IsString()
    userId: string;

    @IsNumber()
    sum: number;
  }

  export class Response {
    payLink: string;
  }
}
