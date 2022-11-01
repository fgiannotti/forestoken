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
import { DefaultErrorFilter } from './default-error.filter';
import { AffiliatesService } from '../services/affiliates.service';
import { Affiliate } from '../entities/affiliate.entity';
import { AffiliateDto } from '../dtos/affiliate.dto';

@Controller('affiliates')
@UseFilters(new DefaultErrorFilter())
export class AffiliatesController {
  constructor(private affiliatesService: AffiliatesService) {}

  @Post()
  async create(@Res() response, @Body() affiliateDto: AffiliateDto) {
    // TODO:vCheck if account exists in paypal

    const createdAffiliate: Affiliate = await this.affiliatesService.create(
      affiliateDto,
    );
    return response.status(HttpStatus.OK).json(createdAffiliate);
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') affiliateId) {
    return response
      .status(HttpStatus.OK)
      .json(this.affiliatesService.findOne(affiliateId));
  }

  @Get('/')
  async findAll(@Res() response) {
    return response
      .status(HttpStatus.OK)
      .json(this.affiliatesService.findAll());
  }
}
