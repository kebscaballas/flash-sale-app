import { IsEmail, IsOptional } from 'class-validator';

export default class ListPaymentsPayload {
  @IsOptional()
  @IsEmail()
  email: string;
}
