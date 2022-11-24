import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { AccreditationState } from '../entities/accreditationState.enum';

// DTO for querying accreditations
export class AccreditationStateQueryDto {
  @IsOptional()
  state: AccreditationState | undefined;

  @IsOptional()
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    { message: 'page must be a number' },
  )
  @Transform(({ value }) => parseInt(value))
  page: number | null = 0;

  @IsOptional()
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    { message: 'pageSize must be a number' },
  )
  @Transform(({ value }) => parseInt(value))
  pageSize: number | null = 50;
}
