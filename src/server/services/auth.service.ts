import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import axios from 'axios';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_SERVICE')
    private readonly usersService: UsersService,
  ) {}
  private baseUrl = 'https://www.googleapis.com/oauth2/v1';

  async existsUser(accessToken: string) {
    const url = this.baseUrl + '/userinfo?access_token=' + accessToken;
    const googleResponse = await axios.get(url);

    const user = await this.usersService.findOneByMail(
      googleResponse['data']['email'],
    );
    const userExists = user !== null;
    return userExists;
  }
}
