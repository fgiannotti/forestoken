import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async getGoogleLogin(req, res) {
    await this.userRepository
      .findOneBy({ mail: req.user.mail })
      .then((user) => {
        if (user) {
          return res.redirect('/home');
        } else {
          return req.user;
        }
      });
  }
}
