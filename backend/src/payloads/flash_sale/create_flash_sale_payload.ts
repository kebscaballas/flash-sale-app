import { IsDateString, IsDefined, IsNotEmpty } from 'class-validator';

export default class CreateFlashSalePayload {
  @IsDefined()
  @IsNotEmpty()
  @IsDateString(undefined, {
    message:
      'Value should be a datestring compliant with the ISO8601 standard.',
  })
  started_at: string;

  @IsDefined()
  @IsNotEmpty()
  @IsDateString(undefined, {
    message:
      'Value should be a datestring compliant with the ISO8601 standard.',
  })
  ended_at: string;
}
