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
import { AccreditationsService } from '../services/accreditations.service';
import { FileService } from '../services/file.service';
import { AccreditationState } from '../entities/accreditationState.enum';

export class InvalidStateError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'InvalidStateError';
  }
}

@Controller()
@UseFilters(new DefaultErrorFilter())
export class TokensController {
  constructor(
    private tokensService: TokensService,
    private powrService: PoWRService,
    private movementsService: MovementsService,
    private usersService: UsersService,
    private accreditationService: AccreditationsService,
    private fileService: FileService,
  ) {}

  @Get('/wallets/:id/balance')
  async getBalanceOf(@Res() response, @Param('id') id) {
    const balanceOf = await this.tokensService.balanceOf(id);
    const powrs = await this.tokensService.getConsumablesPowr(id);
    return response
      .status(HttpStatus.OK)
      .json({ balanceOf: balanceOf, consumables: powrs });
  }

  @Post('/users/:id/wallets/powrs')
  async createPoWR(@Res() response, @Param('id') id, @Body() body) {
    // This endpoint will create the movement and the powr (in the db and in the blockchain)
    //IMPROVEMENT: if the blockchain call fails, rollback all the db changes (using db transactions)
    const user: User = await this.usersService.findOne(id);
    const accreditation = await this.accreditationService.findOne(
      body.id_accreditation,
    );

    if (accreditation.state !== AccreditationState.approved) {
      throw new InvalidStateError(
        'Accreditation is not approved (state: ' + accreditation.state + ')',
      );
    }

    const powrDto: PoWRDto = {
      saleContractPath: accreditation.pathSaleContract,
      depositCertPath: accreditation.pathDeposit,
      collectionRightsContractPath: accreditation.pathComercialContract,
      createdAt: new Date(),
      walletId: user.walletId,
    };
    const powr = await this.powrService.create(powrDto);

    const saleContractHash = await this.fileService.hashFile(
      accreditation.pathSaleContract,
    );
    const depositCertHash = await this.fileService.hashFile(
      accreditation.pathDeposit,
    );
    const collectionRightsContractHash = await this.fileService.hashFile(
      accreditation.pathComercialContract,
    );
    await this.tokensService.mintWithPowr(
      saleContractHash.toString(),
      depositCertHash.toString(),
      collectionRightsContractHash.toString(),
      user.walletId,
      body.amount,
    );

    const movementDto: MovementDto = {
      userId: user.id,
      description: 'Ingresaste tokens',
      amount: body.amount,
      burned: false,
      powrId: powr.id,
      date: powrDto.createdAt,
    };
    await this.movementsService.create(movementDto);
    await this.accreditationService.confirmMint(accreditation.id);

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

  @Get('/tokens/events')
  async getEvents(@Res() response) {
    const name = await this.tokensService.getAllEvents();
    console.log(name.length);
    return response.status(HttpStatus.OK).json(name);
  }
}
