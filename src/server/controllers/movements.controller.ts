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
import { MovementQueryDto } from '../dtos/movementQuery.dto';
import { Movement } from '../entities/movement.entity';

@Controller('movements')
@UseFilters(new DefaultErrorFilter())
export class MovementsController {
  constructor(private movementsService: MovementsService) {}

  @Get()
  async findAll(
    @Res() response,
    @Query() parameters: MovementQueryDto,
  ): Promise<any> {
    const movements = await this.movementsService.findByUserId(
      parameters.userId,
      parameters.movementType,
      parameters.page,
      parameters.pageSize,
    );
    return response
      .status(HttpStatus.OK)
      .json(movements.map((mov) => this.toDto(mov)));
  }

  toDto(mov: Movement) {
    return {
      id: mov.id,
      userId: mov.userId,
      description: mov.description,
      burned: mov.burned,
      amount: mov.amount,
      date: mov.date.toLocaleString('es-AR'),
    };
  }
}
