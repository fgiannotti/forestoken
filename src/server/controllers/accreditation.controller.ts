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
import { AccreditationGetDto } from '../dtos/accreditationGet.dto';
import { AccreditationState } from '../entities/accreditationState.enum';

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

  @Get('/:userId')
  async findByIdUser(@Res() response, @Param('userId') userId) {
    const accreditations = await this.accreditationService.findAllById(userId);
    //logica del dto para mostrar devolver datos formateados
    const accreditationsDto = accreditations.map((accreditation) => {
      let state;
      switch (accreditation.state) {
        case AccreditationState.minted:
          state = 'Minteada';
          break;
        case AccreditationState.approved:
          state = 'Aprobada';
          break;
        case AccreditationState.rejected:
          state = 'Rechazada';
          break;
        case AccreditationState.generated:
          state = 'Generada';
          break;
        case AccreditationState.burned:
          state = 'Quemada';
          break;
      }
      const accreditationDto: AccreditationGetDto = {
        userId: accreditation.userId,
        firstName: accreditation.firstName,
        lastName: accreditation.lastName,
        email: accreditation.email,
        typeOfWood: accreditation.typeOfWood,
        quantity: accreditation.quantity,
        date: new Date(accreditation.date).toLocaleDateString().slice(0, 10),
        phone: accreditation.phone,
        pathSaleContract: accreditation.pathSaleContract,
        pathDeposit: accreditation.pathDeposit,
        pathComercialContract: accreditation.pathComercialContract,
        state: state,
      };
      return accreditationDto;
    });
    return response.status(HttpStatus.OK).json(accreditationsDto);
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
