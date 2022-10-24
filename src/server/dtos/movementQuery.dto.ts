import { Transform } from "class-transformer";
import { IsIn, IsNumber, IsOptional } from "class-validator";
import { MovementType } from "../entities/movementType.enum";

// DTO for querying movements
export class MovementQueryDto {
  @IsNumber({ 
    allowNaN: false,
    maxDecimalPlaces: 0,
    allowInfinity: false,
  }, { message: "userId must be a number" })
  @Transform(({ value }) => parseInt(value))
  userId: number;

  @IsOptional()
  @IsIn(['0', '1'], { message: "movementType must be burn or mint" })
  movementType : MovementType | undefined;

  @IsOptional()
  @IsNumber( {
    allowNaN: false,
    allowInfinity: false,
  }, { message: "page must be a number" })
  @Transform(({ value }) => parseInt(value))
  page : number | null = 0;

  @IsOptional()
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  }, { message: "pageSize must be a number" })
  @Transform(({ value }) => parseInt(value))
  pageSize : number | null = 50;
}
