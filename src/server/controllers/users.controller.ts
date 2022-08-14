import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Res() response, @Body() userDto: UserDto) {
    const createdUser: User = await this.usersService.create(userDto);

    return response.status(HttpStatus.OK).json(createdUser);
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    try {
      const user = await this.usersService.findOne(id);
      return response.status(HttpStatus.OK).json(user);
    } catch (err) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(err.message);
    }
  }

  @Get()
  async findAll(@Res() response) {
    try {
      const users = await this.usersService.findAll();
      return response.status(HttpStatus.OK).json(users);
    } catch (err) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(err.message);
    }
  }
}
