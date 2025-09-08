import { IsDefined, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export default class CreatePaymentPayload {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  product_id: number;
}
