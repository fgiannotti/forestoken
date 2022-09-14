import { Logger, Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { Wallet } from '../entities/wallet.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WalletsService {
  private readonly logger = new Logger(WalletsService.name);
  constructor(
    @InjectRepository(Wallet)
    private walletsRepository: Repository<Wallet>,
  ) {}

  private readonly web3: Web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${process.env.ETHEREUM_NETWORK}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    ),
  );

  public async generateAddressFor(userId: number): Promise<Wallet> {
    const web3Account = this.web3.eth.accounts.create();
    const wallet: Wallet = {
      userId: userId.toString(),
      address: web3Account.address,
      privateKey: web3Account.privateKey,
    };
    this.logger.log(`Generated wallet: ${JSON.stringify(wallet)}`);
    return this.walletsRepository.save(wallet);
  }
}
