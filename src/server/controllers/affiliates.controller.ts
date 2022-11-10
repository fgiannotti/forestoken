import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Render,
  Res,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { DefaultErrorFilter } from './default-error.filter';
import { AffiliatesService } from '../services/affiliates.service';
import { Affiliate } from '../entities/affiliate.entity';
import { AffiliateDto } from '../dtos/affiliate.dto';
import { ParamsInterceptor } from './params.interceptor';
import { ConfigInterceptor } from '../config/config.interceptor';

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
  @Get('/all')
  async findAllAffiliates(@Res() response) {
    return response
      .status(HttpStatus.OK)
      .json(this.affiliatesService.findAll());
  }

  @Get('/new-affiliate')
  @Render('affiliates/new-affiliate')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  async new() {
    return {};
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') affiliateId) {
    return response
      .status(HttpStatus.OK)
      .json(this.affiliatesService.findOne(affiliateId));
  }

  @Get('/')
  @Render('affiliates')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  async findAll() {
    return {};
  }
}
