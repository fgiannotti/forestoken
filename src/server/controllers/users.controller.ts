import { Body, Controller, Get, HttpStatus, Logger, Param, Post, Res, UseFilters } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { DefaultErrorFilter } from './default-error.filter';
import { WalletsService } from '../services/wallets.service';

@Controller('users')
@UseFilters(new DefaultErrorFilter())
export class UsersController {
  private logger = new Logger(UsersController.name);
  constructor(private usersService: UsersService, private walletsService: WalletsService) {}

  @Post()
  async create(@Res() response, @Body() userDto: UserDto) {
    const createdUser: User = await this.usersService.create(userDto);
    await this.createWalletForUser(createdUser);

    return response.status(HttpStatus.OK).json(createdUser);
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const user = await this.usersService.findOne(id);
    return response.status(HttpStatus.OK).json(user);
  }

  @Get()
  async findAll(@Res() response) {
    const users = await this.usersService.findAll();
    return response.status(HttpStatus.OK).json(users);
  }

  @Get('/isAdmin/:id')
  async isAdmin(@Res() response, @Param('id') id) {
    const user = await this.usersService.findOne(id);
    return response.status(HttpStatus.OK).json(user.isAdmin[0]);
  }

  @Post('/setAdmin')
  async setAdmin(@Res() response, @Body() id: number) {
    const user = await this.usersService.findOne(id);
    user.isAdmin = true;
    await this.usersService.save(user);
    return response.status(HttpStatus.OK).json(true);
  }
  /** private **/
  private async createWalletForUser(createdUser: User) {
    const wallet = await this.walletsService.generateAddressFor(createdUser.id);
    createdUser.walletId = wallet.address;
    await this.usersService.save(createdUser);
    this.logger.log(`saved user: ${JSON.stringify(createdUser)}`);
  }
}
