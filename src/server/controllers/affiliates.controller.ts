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
import { AffiliatesService } from '../services/affiliates.service';
import { Affiliate } from '../entities/affiliate.entity';

export class AffiliateDto {
  name: string;
  location: string;
}

@Controller('affiliates')
@UseFilters(new DefaultErrorFilter())
export class AffiliatesController {
  constructor(private affiliatesService: AffiliatesService) {}

  @Post()
  async create(@Res() response, @Body() affiliateDto: AffiliateDto) {
    const createdAffiliate: Affiliate = await this.affiliatesService.create(affiliateDto);
    return response.status(HttpStatus.OK).json(createdAffiliate);
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') affiliateId) {
    return response.status(HttpStatus.OK).json(this.affiliatesService.findOne(affiliateId));
  }


  @Get('/')
  async findAll(@Res() response) {
    return response.status(HttpStatus.OK).json(this.affiliatesService.findAll());
  }

}
