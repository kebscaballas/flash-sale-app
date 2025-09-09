import { IsEmail, IsOptional } from 'class-validator';

export default class ListPaymentsPayload {
  @IsOptional()
  @IsEmail(undefined, { message: 'E-mail has an invalid format.' })
  email: string;
}
