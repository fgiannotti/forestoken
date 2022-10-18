import { Logger, Injectable } from '@nestjs/common';
import Web3 from 'web3';
import fs from 'fs';
import path from 'path';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';

@Injectable()
export class TokensService {
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
    // Configuring the connection to an Ethereum node
    // Creating a signing account from a private key
    const signer = this.web3Client.eth.accounts.privateKeyToAccount(
      process.env.FORESTOKEN_PRIVATE_KEY,
    );
    this.web3Client.eth.accounts.wallet.add(signer);

    const receipt = await this.contract.methods
      .createPowr(
        saleContractHash,
        depositCertHash,
        collectionRightsContractHash,
        walletId,
        amount,
        Date.now(),
      )
      .send({
        from: process.env.FORESTOKEN_OWNER_ADDRESS,
        gasLimit: 2216800,
        gasPrice: 1000000000,
      })
      .once('transactionHash', (txhash) => {
        console.log(`Mining transaction ...`);
        console.log(
          `https://${process.env.ETHEREUM_NETWORK}.etherscan.io/tx/${txhash}`,
        );
      })
      .on('error', (error) => {
        console.log(error);
      });
    // Este objeto dice qué eventos se publicaron, el hash de la transaction, etc.
    console.log(receipt);
    console.log('Transaction mined!');
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

  public async balanceOf(address: string): Promise<string> {
    return this.contract.methods.balanceOf(address).call();
  }
}
