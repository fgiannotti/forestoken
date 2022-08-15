import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Res,
} from '@nestjs/common';

import { TokensService } from '../services/tokens.service';

@Controller('tokens')
export class TokensController {
  private readonly logger = new Logger(TokensController.name);
  constructor(private tokensService: TokensService) {}

  @Get('/total-supply')
  async getTotalSupply(@Res() response) {
    try {
      const totalSupply = await this.tokensService.totalSupply();
      return response.status(HttpStatus.OK).json(totalSupply);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Get('/symbol')
  async getSymbol(@Res() response) {
    try {
      const symbol = await this.tokensService.symbol();
      return response.status(HttpStatus.OK).json(symbol);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Get('/name')
  async getName(@Res() response) {
    try {
      const name = await this.tokensService.name();
      return response.status(HttpStatus.OK).json(name);
    } catch (e) {
      this.logger.error(e);
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
      this.logger.error(e);
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
