import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Res,
  UseFilters,
} from '@nestjs/common';
import { DefaultErrorFilter } from './default-error.filter';
import { MovementsService } from '../services/movements.service';
import { MovementType } from '../entities/movementType.enum';

@Controller('movements')
@UseFilters(new DefaultErrorFilter())
export class MovementsController {
  constructor(
    private movementsService: MovementsService,
  ) {}

  @Get()
  async findAll(@Res() response,
    @Query('userId') userId : number,
    @Query('movementType') movementType : MovementType,
    @Query('page') page : number,
    @Query('pageSize') pageSize : number,
  ): Promise<any> {
    const users = await this.movementsService.findByUserId2(userId, movementType, page, pageSize);
    return response.status(HttpStatus.OK).json(users);
  }
}
