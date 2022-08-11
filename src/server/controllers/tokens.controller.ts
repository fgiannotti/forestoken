import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';

import { TokensService } from '../services/tokens.service';

@Controller('tokens')
export class TokensController {
  constructor(private tokensService: TokensService) {}

  @Get('/totalSupply')
  async getTotalSupply(@Res() response) {
    const totalSupply = this.tokensService.totalSupply();
    return response.status(HttpStatus.OK).json({
      totalSupply,
    });
  }

  @Get('/symbol')
  async getSymbol(@Res() response) {
    const symbol = this.tokensService.symbol();
    return response.status(HttpStatus.OK).json({
      symbol,
    });
  }

  @Get('/name')
  async getName(@Res() response) {
    const name = this.tokensService.name();
    return response.status(HttpStatus.OK).json({
      name,
    });
  }

  @Get('/balanceOf/:id')
  async getBalanceOf(@Res() response, @Param('id') id) {
    const balanceOf = this.tokensService.balanceOf(id);
    return response.status(HttpStatus.OK).json({
      balanceOf,
    });
  }

  @Post('/transfer')
  async transfer(@Res() response, @Body() body) {
    const transfer = this.tokensService.transfer(
      body.from,
      body.to,
      body.amount,
    );
    return response.status(HttpStatus.OK).json({
      transfer,
    });
  }
}
