import { IsDateString, IsDefined, IsNotEmpty } from 'class-validator';

export default class CreateFlashSalePayload {
  @IsDefined()
  @IsNotEmpty()
  @IsDateString()
  started_at: string;

  @IsDefined()
  @IsNotEmpty()
  @IsDateString()
  ended_at: string;
}
