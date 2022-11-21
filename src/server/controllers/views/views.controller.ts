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
  async home(@Res() response, @Req() request) {
    const userId = response.locals.userId;
    if (userId === undefined) {
      throw new UnauthorizedException('No user id provided');
    }
    const user: User = await this.usersService.findOne(userId);

    this.logger.log(
      `Retreiving tokens for user ${userId} with wallet ${user.walletId} ....`,
    );
    const tokensAmount: number = await this.tokensService.balanceOf(
      user.walletId,
    );

    const movements: Movement[] = await this.movementsService.findByUserId(
      userId,
      undefined,
      0,
      10,
    );

    const home: HomeDto = new homeBuilder(this.TOKEN_PRICE)
      .withUser(user.name, user.id)
      .withBalance(tokensAmount)
      .withMovements(movements)
      .build();

    return response.status(HttpStatus.OK).json(home);
  }
}
