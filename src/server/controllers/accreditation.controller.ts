import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Render,
  Res,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AccreditationsService } from '../services/accreditations.service';
import { AccreditationDto } from '../dtos/accreditation.dto';
import { Accreditation } from '../entities/accreditation.entity';
import { DefaultErrorFilter } from './default-error.filter';
import { ParamsInterceptor } from './params.interceptor';
import { ConfigInterceptor } from '../config/config.interceptor';

@Controller('accreditations')
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

  @Put('/:id/approve')
  async approve(@Res() response, @Param('id') id) {
    const accreditation = await this.accreditationService.approve(id);
    return response.status(HttpStatus.OK).json(accreditation);
  }

  @Put('/:id/reject')
  async reject(@Res() response, @Param('id') id) {
    const accreditation = await this.accreditationService.reject(id);
    return response.status(HttpStatus.OK).json(accreditation);
  }

  @Get('/admin/pendings')
  async findAllPendings() {
    return await this.accreditationService.findAllPendings();
  }

  @Get('/admin/:id')
  async findById(@Res() response, @Param('id') id) {
    const accreditation = await this.accreditationService.findOne(id);
    return response.status(HttpStatus.OK).json(accreditation);
  }

  @Get(':[id]')
  @Render('accreditation/[id]')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  public accreditationById(@Param('id') id: string) {
    return { id };
  }
}
