import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';
import { AccreditationsService } from '../services/accreditations.service';
import { AccreditationDto } from '../dtos/accreditation.dto';
import { Accreditation } from '../entities/accreditation.entity';
import { DefaultErrorFilter } from './default-error.filter';

@Controller('accreditation')
@UseFilters(new DefaultErrorFilter())
export class AccreditationsController {
  constructor(private accreditationService: AccreditationsService) {}

  @Post()
  async create(@Res() response, @Body() accreditationDto: AccreditationDto) {
    const createdAccreditation: Accreditation =
      await this.accreditationService.create(accreditationDto);
    return response.status(HttpStatus.OK).json(createdAccreditation);
  }

  @Get('/:id')
  async findByIdUser(@Res() response, @Param('id') id) {
    const accreditation = await this.accreditationService.findAllById(id);
    return response.status(HttpStatus.OK).json(accreditation);
  }
}
