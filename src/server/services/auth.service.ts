import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import axios from 'axios';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  private baseUrl = 'https://www.googleapis.com/oauth2/v1';

  async getUserFromAccessToken(accessToken: string): Promise<User> {
    const url = this.baseUrl + '/userinfo?access_token=' + accessToken;
    const googleResponse = await axios.get(url);

    return await this.usersService.findOneByMail(
      googleResponse['data']['email'],
    );
  }

  async getUserFromIdToken(idToken: string): Promise<User> {
    const url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' + idToken;
    const googleResponse = await axios.get(url);

    return await this.usersService.findOneByMail(
      googleResponse['data']['email'],
    );
  }
}
