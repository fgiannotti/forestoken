import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { DefaultErrorFilter } from '../default-error.filter';
import { WalletsService } from '../../services/wallets.service';
import { TokensService } from '../../services/tokens.service';
import { Request } from 'express';
import { HomeDto } from './home.dto';
import { homeBuilder } from './homeBuilder';
import { Movement } from '../../entities/movement.entity';
import { createMockMovement } from '../../../test/test-utils';

@Controller('views')
@UseFilters(new DefaultErrorFilter())
export class ViewsController {
  private logger = new Logger(ViewsController.name);
  private fakeMovements: Movement[] = [
    createMockMovement(),
    createMockMovement(),
  ];
  constructor(
    private tokensService: TokensService,
    private walletsService: WalletsService,
  ) {}

  @Get('/home')
  async home(@Res() response, @Req() request: Request) {
    const user_id = Number(request.headers['user_id'] as string); // FIX when access token gives user_id
    const wallet = await this.walletsService.findByUserId(user_id);
    const tokensAmount = await this.tokensService.balanceOf(wallet.address);

    const home: HomeDto = new homeBuilder()
      .withBalance(Number(tokensAmount))
      .withMovements(this.fakeMovements)
      .build();
    return response.status(HttpStatus.OK).json(home);
  }
}
