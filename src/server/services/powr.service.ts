import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PoWR } from '../entities/powr.entity';
import { PoWRDto } from '../dtos/powr.dto';

@Injectable()
export class PoWRService {
  constructor(
    @InjectRepository(PoWR)
    private repository: Repository<PoWR>,
  ) {}

  findByWalletId(walletId: string): Promise<PoWR[]> {
    return this.repository.find({ where: { walletId: walletId } });
  }

  findOne(id: number): Promise<PoWR> {
    return this.repository.findOneBy({ id });
  }

  async create(powrDto: PoWRDto): Promise<PoWR> {
    const powr = this.repository.create(powrDto);
    return this.repository.save(powr);
  }
}
