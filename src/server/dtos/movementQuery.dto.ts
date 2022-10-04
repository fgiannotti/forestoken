import { IsIn, IsNumberString, IsOptional } from "class-validator";
import { MovementType } from "../entities/movementType.enum";

// DTO for querying movements
export class MovementQueryDto {
  @IsNumberString({ 
    allowNaN: false,
    maxDecimalPlaces: 0,
    allowInfinity: false,
  }, { message: "userId must be a number" })
  userId: number;

  @IsOptional()
  @IsIn(['0', '1'], { message: "movementType must be burn or mint" })
  movementType : MovementType;

  @IsNumberString({ 
    allowNaN: false,
    maxDecimalPlaces: 0,
    allowInfinity: false 
  }, { message: "page must be a number" })
  page : number;

  @IsNumberString({ 
    allowNaN: false,
    maxDecimalPlaces: 0,
    allowInfinity: false 
  }, { message: "pageSize must be a number" })
  pageSize : number;
}
