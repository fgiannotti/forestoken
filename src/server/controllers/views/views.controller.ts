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
import { TokensService } from '../../services/tokens.service';
import { Request } from 'express';
import { HomeDto } from './home.dto';
import { homeBuilder } from './homeBuilder';
import { Movement } from '../../entities/movement.entity';
import { MovementsService } from '../../services/movements.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../entities/user.entity';

@Controller('views')
@UseFilters(new DefaultErrorFilter())
export class ViewsController {
  constructor(
    private tokensService: TokensService,
    private movementsService: MovementsService,
    private usersService: UsersService,
  ) {}
  private readonly TOKEN_PRICE = 2850;

  private logger = new Logger(ViewsController.name);

  @Get('/home')
  async home(@Res() response, @Req() request: Request) {
    const userId = Number(request.headers['user_id'] as string); // FIX when access token gives user_id
    if (isNaN(userId)) {
      throw new UnauthorizedException('Invalid user_id header');
    }
    const user: User = await this.usersService.findOne(userId);

    this.logger.log(`Retreiving tokens for user ${userId} with wallet ${user.walletId} ....`);
    const tokensAmount: string = await this.tokensService.balanceOf(user.walletId,);

    const movements: Movement[] = await this.movementsService.findByUserId(userId, undefined, 0, 10);

    const home: HomeDto = new homeBuilder(this.TOKEN_PRICE)
      .withUsername(user.name)
      .withBalance(Number(tokensAmount))
      .withMovements(movements)
      .build();
    return response.status(HttpStatus.OK).json(home);
  }
}
