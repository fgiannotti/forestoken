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
import { MovementQueryDto } from '../dtos/movementQuery.dto';

@Controller('movements')
@UseFilters(new DefaultErrorFilter())
export class MovementsController {
  constructor(
    private movementsService: MovementsService,
  ) {}

  @Get()
  async findAll(@Res() response,
    @Query() parameters : MovementQueryDto,
  ): Promise<any> {
    const movements = await this.movementsService.findByUserId(
      parameters.userId, parameters.movementType, parameters.page, parameters.pageSize
    );
    return response.status(HttpStatus.OK).json(movements);
  }
}
