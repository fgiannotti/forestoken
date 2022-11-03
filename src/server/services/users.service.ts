import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserDto } from '../dtos/user.dto';
import { PoWR } from '../entities/powr.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    const user = this.usersRepository.findOneBy({ id: id });
    return user;
  }

  findOneByMail(mail: string): Promise<User> {
    return this.usersRepository.findOneBy({ mail: mail });
  }

  async findBy(criteria: any): Promise<User[]> {
    return this.usersRepository.find(criteria);
  }

  async findByMail(mail: string): Promise<User> {
    return this.usersRepository.findOneBy({ mail: mail });
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  async create(userDto: UserDto): Promise<User> {
    const user = this.usersRepository.create(userDto);
    return this.usersRepository.save(user);
  }

  async save(user: User) {
    await this.usersRepository.save(user);
  }
}
