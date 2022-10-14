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
import { MovementsService } from '../../services/movements.service';

@Controller('views')
@UseFilters(new DefaultErrorFilter())
export class ViewsController {
  constructor(
    private tokensService: TokensService,
    private walletsService: WalletsService,
    private movementsService: MovementsService,
  ) {}
  private readonly TOKEN_PRICE = 2850;

  private logger = new Logger(ViewsController.name);

  @Get('/home')
  async home(@Res() response, @Req() request: Request) {
    const userId = Number(request.headers['user_id'] as string); // FIX when access token gives user_id
    if (isNaN(userId)) {
      throw new UnauthorizedException('Invalid user_id header');
    }
    const wallet = await this.walletsService.findByUserId(userId);
    this.logger.log(
      `Retreiving tokens for user ${userId} with wallet ${wallet.address} ....`,
    );
    const tokensAmount: string = await this.tokensService.balanceOf(
      wallet.address,
    );
    const movements: Movement[] = await this.movementsService.findByUserId(
      userId,
    );

    const home: HomeDto = new homeBuilder(this.TOKEN_PRICE)
      .withBalance(Number(tokensAmount))
      .withMovements(movements)
      .build();
    return response.status(HttpStatus.OK).json(home);
  }
}
