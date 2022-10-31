import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';

import { TokensService } from '../services/tokens.service';
import { DefaultErrorFilter } from './default-error.filter';
import { MovementsService } from '../services/movements.service';
import { PoWRService } from '../services/powr.service';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { MovementDto } from '../dtos/movement.dto';
import { PoWRDto } from '../dtos/powr.dto';

@Controller()
@UseFilters(new DefaultErrorFilter())
export class TokensController {
  constructor(
    private tokensService: TokensService,
    private powrService: PoWRService,
    private movementsService: MovementsService,
    private usersService: UsersService,
  ) {}

  @Get('/wallets/:id/balance')
  async getBalanceOf(@Res() response, @Param('id') id) {
    const balanceOf = await this.tokensService.balanceOf(id);
    return response.status(HttpStatus.OK).json(balanceOf);
  }

  @Post('/users/:id/wallets/powrs')
  async createPoWR(@Res() response, @Param('id') id, @Body() body) {
    // This endpoint will create the movement and the powr (in the db and in the blockchain)
    //IMPROVEMENT: if the blockchain call fails, rollback all the db changes (using db transactions)
    const user: User = await this.usersService.findOne(id);
    //probably here it will come the whole file instead of the path
    // and we will have to also store the file in our local filesystem
    // For now i'll just use the path
    const powrDto: PoWRDto = {
      saleContractPath: '',
      depositCertPath: '',
      collectionRightsContractPath: '',
      createdAt: new Date(),
      walletId: user.walletId,
    };
    const powr = await this.powrService.create(powrDto);
    const movementDto: MovementDto = {
      userId: user.id,
      description: 'Ingresaste tokens',
      amount: body.amount,
      burned: false,
      powrId: powr.id,
      date: powrDto.createdAt,
    };
    await this.movementsService.create(movementDto);
    await this.tokensService.mintWithPowr(
      '0x0',
      '0x1',
      '0x2',
      user.walletId,
      body.amount,
    );
    return response.status(HttpStatus.OK).json('powr-created');
  }

  // ------- HELPERS USED TO TEST CONTRACT CALLS -------
  @Get('tokens/total-supply')
  async getTotalSupply(@Res() response) {
    const totalSupply = await this.tokensService.totalSupply();
    return response.status(HttpStatus.OK).json(totalSupply);
  }

  @Get('tokens/symbol')
  async getSymbol(@Res() response) {
    const symbol = await this.tokensService.symbol();
    return response.status(HttpStatus.OK).json(symbol);
  }

  @Get('/tokens/name')
  async getName(@Res() response) {
    const name = await this.tokensService.name();
    return response.status(HttpStatus.OK).json(name);
  }
}
