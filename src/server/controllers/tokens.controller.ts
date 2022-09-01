import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';

import { TokensService } from '../services/tokens.service';
import { DefaultErrorFilter } from './default-error.filter';

@Controller('tokens')
@UseFilters(new DefaultErrorFilter())
export class TokensController {
  private readonly logger = new Logger(TokensController.name);
  constructor(private tokensService: TokensService) {}

  @Get('/total-supply')
  async getTotalSupply(@Res() response) {
    const totalSupply = await this.tokensService.totalSupply();
    return response.status(HttpStatus.OK).json(totalSupply);
  }

  @Get('/symbol')
  async getSymbol(@Res() response) {
    const symbol = await this.tokensService.symbol();
    return response.status(HttpStatus.OK).json(symbol);
  }

  @Get('/name')
  async getName(@Res() response) {
    const name = await this.tokensService.name();
    return response.status(HttpStatus.OK).json(name);
  }

  @Get('/balanceOf/:id')
  async getBalanceOf(@Res() response, @Param('id') id) {
    const balanceOf = await this.tokensService.balanceOf(id);
    return response.status(HttpStatus.OK).json(balanceOf);
  }

  @Post('/transfer')
  async transfer(@Res() response, @Body() body) {
    const transfer = await this.tokensService.transfer(
      body.from,
      body.to,
      body.amount,
    );
    return response.status(HttpStatus.OK).json(transfer);
  }
}
