import { IsDefined, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export default class CreatePaymentPayload {
  @IsDefined({ message: 'E-mail is required.' })
  @IsNotEmpty({ message: 'E-mail is required.' })
  @IsEmail(undefined, { message: 'E-mail has an invalid format.' })
  email: string;

  @IsDefined({ message: 'Product ID is required.' })
  @IsNotEmpty({ message: 'Product ID is required.' })
  @IsNumber(undefined, { message: 'The Product ID passed is invalid.' })
  product_id: number;
}
