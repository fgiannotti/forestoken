import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() userDto: UserDto): User {
    let createdUser = null;
    this.usersService.create(userDto).then((u) => {
      createdUser = u;
    });

    return createdUser;
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
