import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
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
import { AccreditationStateQueryDto } from '../dtos/accreditationQuery.dto';

@Controller('accreditations')
@UseFilters(new DefaultErrorFilter())
export class AccreditationsController {
  constructor(private accreditationService: AccreditationsService) {}

  @Post()
  async create(@Res() response, @Body() accreditationDto: AccreditationDto) {
    const createdAccreditation: Accreditation = await this.accreditationService.create(accreditationDto);
    return response.status(HttpStatus.OK).json(createdAccreditation);
  }

  @Get('/new-request')
  @Render('accreditation/new-request')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  public newRequest() {
    return {};
  }

  @Get('/:userId')
  async findByIdUser(@Res() response, @Param('userId') userId) {
    const accreditations = await this.accreditationService.findAllById(userId);
    return response.status(HttpStatus.OK).json(transformData(accreditations));
  }

  @Get('/filter/userId/:userId')
  async findAllByIdUser(@Res() response, @Param('userId') userId, @Query() parameters: AccreditationStateQueryDto) {
    const accreditations = await this.accreditationService.findBy(
      userId,
      parameters.state,
      parameters.page,
      parameters.pageSize,
    );
    return response.status(HttpStatus.OK).json(transformData(accreditations));
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

  @Get('/admin/all')
  async accreditationsAll(@Res() response) {
    const accreditations = await this.accreditationService.findAll();
    return response.status(HttpStatus.OK).json(transformData(accreditations));
  }

  @Get('/admin/:state')
  async findAll(@Res() response, @Param('state') state: AccreditationState) {
    const accreditations = await this.accreditationService.findByState(state);
    return response.status(HttpStatus.OK).json(transformData(accreditations));
  }

  @Get('/admin/pendings')
  async findAllPendings() {
    return await this.accreditationService.findAllPendings();
  }

  @Get('/admin/id/:id')
  async findById(@Res() response, @Param('id') id) {
    const accreditation = await this.accreditationService.findOne(id);
    return response.status(HttpStatus.OK).json(accreditation);
  }
}

const transformData = (accreditations: Accreditation[]) => {
  return accreditations.map((accreditation) => {
    let state;
    switch (accreditation.state) {
      case AccreditationState.minted:
        state = 'Emitida';
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
      id: accreditation.id,
      userId: accreditation.userId,
      firstName: accreditation.firstName,
      lastName: accreditation.lastName,
      email: accreditation.email,
      typeOfWood: accreditation.typeOfWood,
      quantity: accreditation.quantity,
      depositDate: new Date(accreditation.depositDate).toLocaleDateString('es-AR'),
      date: new Date(accreditation.depositDate).toLocaleDateString('es-AR'),
      phone: accreditation.phone,
      pathSaleContract: accreditation.pathSaleContract,
      pathDeposit: accreditation.pathDeposit,
      pathComercialContract: accreditation.pathComercialContract,
      state: state,
    };
    return accreditationDto;
  });
};
