import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Req,
  Res,
  UnauthorizedException,
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
  constructor(
    private tokensService: TokensService,
    private walletsService: WalletsService,
  ) {}

  private logger = new Logger(ViewsController.name);
  private fakeMovements: Movement[] = [
    createMockMovement(),
    createMockMovement(),
  ];

  @Get('/home')
  async home(@Res() response, @Req() request: Request) {
    const userId = Number(request.headers['user_id'] as string); // FIX when access token gives user_id
    if (isNaN(userId)) {
      throw new UnauthorizedException('Invalid user_id header');
    }
    const wallet = await this.walletsService.findByUserId(userId);
    const tokensAmount: string = await this.tokensService.balanceOf(
      wallet.address,
    );

    const home: HomeDto = new homeBuilder()
      .withBalance(Number(tokensAmount))
      .withMovements(this.fakeMovements)
      .build();
    return response.status(HttpStatus.OK).json(home);
  }
}
