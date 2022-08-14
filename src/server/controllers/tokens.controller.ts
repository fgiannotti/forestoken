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

  @Get('/total-supply')
  async getTotalSupply(@Res() response) {
    const totalSupply = await this.tokensService.totalSupply();
    return response.status(HttpStatus.OK).json({
      totalSupply,
    });
  }

  @Get('/symbol')
  async getSymbol(@Res() response) {
    const symbol = await this.tokensService.symbol();
    return response.status(HttpStatus.OK).json({
      symbol,
    });
  }

  @Get('/name')
  async getName(@Res() response) {
    try {
      const name = await this.tokensService.name();
      return response.status(HttpStatus.OK).json({
        name,
      });
    } catch (e) {
      console.log(e);
    }
  }

  @Get('/balanceOf/:id')
  async getBalanceOf(@Res() response, @Param('id') id) {
    try {
      const balanceOf = await this.tokensService.balanceOf(id);
      return response.status(HttpStatus.OK).json({
        balanceOf,
      });
    } catch (e) {
      console.log(e);
    }
  }

  @Post('/transfer')
  async transfer(@Res() response, @Body() body) {
    const transfer = await this.tokensService.transfer(
      body.from,
      body.to,
      body.amount,
    );
    return response.status(HttpStatus.OK).json({
      transfer,
    });
  }
}
