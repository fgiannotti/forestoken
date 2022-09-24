import { Logger, Injectable } from '@nestjs/common';
import Web3 from 'web3';
import fs from 'fs';
import path from 'path';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';

@Injectable()
export class TokensService {
  private readonly logger = new Logger(TokensService.name);
  private readonly abi: AbiItem = JSON.parse(
    fs.readFileSync(
      path.resolve('src/server/contracts/build/Forestoken.json'),
      'utf8',
    ),
  ).abi;

  private readonly web3Client: Web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${process.env.ETHEREUM_NETWORK}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    ),
  );

  private contract: Contract = new this.web3Client.eth.Contract(
    this.abi,
    process.env.FORESTOKEN_CONTRACT_ADDRESS,
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
    return this.contract.methods.name().call();
  }

  public async balanceOf(id: string): Promise<string> {
    //Obtiene el PK desde el user
    //const { private_key } = await this.usersService.findOne(id);
    const address = this.web3Client.eth.accounts.privateKeyToAccount(
      process.env.SIGNER_PRIVATE_KEY,
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
      process.env.SIGNER_PRIVATE_KEY,
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
