import { Logger, Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import * as fs from 'fs';
import path from 'path';

@Injectable()
export class TokensService {
  private readonly logger = new Logger(TokensService.name);
  private readonly abi: AbiItem = JSON.parse(
    fs.readFileSync(
      path.resolve('src/server/contracts/build/Forestoken.json'),
      'utf8',
    ),
  ).abi;

  private readonly contractJson = JSON.parse(
    fs.readFileSync(
      path.resolve('src/server/contracts/build/Forestoken.json'),
      'utf8',
    ),
  );
  private readonly web3Client: Web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${process.env.ETHEREUM_NETWORK}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    ),
  );

  private contract: Contract = new this.web3Client.eth.Contract(
    this.contractJson.abi,
    process.env.FORESTOKEN_CONTRACT_ADDRESS,
    { from: process.env.FORESTOKEN_OWNER_ADDRESS, gasPrice: '2000' },
  );

  public async mintWithPowr(
    saleContractHash: string,
    depositCertHash: string,
    collectionRightsContractHash: string,
    walletId: string,
    amount: number,
  ) {
    // get wallet from DB with walletId
    // use wallet private key to sign the transaction
    this.contract.methods
      .createPowr(
        saleContractHash,
        depositCertHash,
        collectionRightsContractHash,
        walletId,
        amount,
        Date.now(),
      )
      .call();
    Logger.log('Minted POWR for walletId ' + walletId);
  }
  public async totalSupply(): Promise<string> {
    return this.contract.methods.totalSupply().call();
  }

  public async symbol(): Promise<string> {
    return this.contract.methods.symbol().call();
  }

  public async name(): Promise<string> {
    const contractJson = JSON.parse(
      fs.readFileSync(
        path.resolve('src/server/contracts/build/Forestoken.json'),
        'utf8',
      ),
    );

    const web3Client = new Web3(
      new Web3.providers.HttpProvider(
        `https://sepolia.infura.io/v3/5b55ff0d83f7488bb0146a63fb49389c`,
      ),
    );

    const contract = new web3Client.eth.Contract(
      contractJson.abi,
      '0x46174d7A2Db240F9aF3Dc84d08E634F3AE586919',
      {
        from: '0xb08fc792b476f2c493F407863A4d3B7DeAC9332D',
        gasPrice: '2000',
      },
    );

    const result = await contract.methods.name().call();
    return result;
  }

  public async balanceOf(id: string): Promise<string> {
    //Obtiene el PK desde el user
    //const { private_key } = await this.usersService.findOne(id);
    const address = this.web3Client.eth.accounts.privateKeyToAccount(
      process.env.FORESTOKEN_PRIVATE_KEY,
    ).address;
    return this.contract.methods.balanceOf(address).call();
  }

  public async transfer(
    fromID: string,
    toID: string,
    amount: string,
  ): Promise<string> {
    // Iria a buscar a la DB las dos PK
    // const fromPK = await this.usersService.findOne(fromID);
    // const toPK = await this.usersService.findOne(toID);

    // Creating a signing account from a private key
    const signer = this.web3Client.eth.accounts.privateKeyToAccount(
      process.env.FORESTOKEN_PRIVATE_KEY,
    );
    this.web3Client.eth.accounts.wallet.add(signer);

    // Creating a signing account from a private key
    const receiver = this.web3Client.eth.accounts.privateKeyToAccount(
      process.env.RECEIVER_PRIVATE_KEY,
    );
    this.web3Client.eth.accounts.wallet.add(receiver);

    return this.contract.methods
      .transfer(signer.address, amount)
      .send({
        from: receiver.address,
        gas: 1000000,
      })
      .once('transactionHash', (txhash) => {
        this.logger.log(`Mining transaction ...`);

        this.logger.log(
          `https://${process.env.ETHEREUM_NETWORK}.etherscan.io/tx/${txhash}`,
        );
      })
      .on('error', (error) => {
        this.logger.error(error);
      });
  }
}
