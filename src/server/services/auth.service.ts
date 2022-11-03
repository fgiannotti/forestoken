import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  private baseUrl = 'https://www.googleapis.com/oauth2/v1';

  async existsUser(accessToken: string) {
    const url = this.baseUrl + '/userinfo?access_token=' + accessToken;
    const googleResponse = await axios.get(url);

    const user = await this.userRepository.findOneBy({
      mail: googleResponse['data']['email'],
    });
    const userExists = user !== null;
    return userExists;
  }
}
