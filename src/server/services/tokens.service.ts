import { Injectable, Logger } from '@nestjs/common';
import Web3 from 'web3';
import fs from 'fs';
import path from 'path';
import { AbiItem } from 'web3-utils';
import { Contract, EventData } from 'web3-eth-contract';
import { TransactionReceipt } from 'web3-core';

// abstraction of EventData from web3-eth-contract
export type EventInfo = {
  returnValues: { [key: string]: any };
  event: string;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  address: string;
};

export type ConsumablePowr = {
  mintedPoWR: EventInfo;
  relatedBurns: EventInfo[];
  tokensStillAvailable: number;
};

@Injectable()
export class TokensService {
  private readonly abi: AbiItem = JSON.parse(
    fs.readFileSync(
      path.resolve('src/server/contracts/build/Forestoken.json'),
      'utf8',
    ),
  ).abi;
  private readonly logger = new Logger(TokensService.name);
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

    const receipt: TransactionReceipt = await this.contract.methods
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

    return receipt.transactionHash;
  }

  public async burnTokensWithPowr(
    saleContractHash: string,
    depositCertHash: string,
    collectionRightsContractHash: string,
    walletId: string,
    spentAmount: number,
  ) {
    // Configuring the connection to an Ethereum node
    // Creating a signing account from a private key
    const signer = this.web3Client.eth.accounts.privateKeyToAccount(
      process.env.FORESTOKEN_PRIVATE_KEY,
    );
    this.web3Client.eth.accounts.wallet.add(signer);

    const receipt: TransactionReceipt = await this.contract.methods
      .burnWithPowr(
        saleContractHash,
        depositCertHash,
        collectionRightsContractHash,
        walletId,
        spentAmount,
        Date.now(),
      )
      .send({
        from: process.env.FORESTOKEN_OWNER_ADDRESS,
        gasLimit: 2216800,
        gasPrice: 1000000000,
      })
      .once('transactionHash', (txhash) => {
        this.logger.log(`Mining transaction ...`);
        this.logger.log(
          `https://${process.env.ETHEREUM_NETWORK}.etherscan.io/tx/${txhash}`,
        );
      })
      .on('error', (error) => {
        this.logger.log(error);
      });
    // Este objeto dice qué eventos se publicaron, el hash de la transaction, etc.
    this.logger.log(receipt);
    this.logger.log('Transaction mined! Burned POWR for walletId ' + walletId);

    return receipt.transactionHash;
  }

  public async getAllEvents(): Promise<EventData[]> {
    return await this.contract.getPastEvents('allEvents', {
      fromBlock: 0,
      toBlock: 'latest',
    });
  }

  // Get all LogPowrCreation and LogPowrWithdraw with given wallet Id
  public async getAllEventsSentToAddress(
    address: string,
  ): Promise<EventData[]> {
    // Todo: Fix, filtering indexed event fields didn't work, getting all instead
    const allBlockchainEvents: EventData[] = await this.getAllEvents();
    return allBlockchainEvents.filter((event: EventData) => {
      return event.returnValues.walletId === address;
    });
  }

  public async getConsumablesPowr(address: string): Promise<ConsumablePowr[]> {
    const result: ConsumablePowr[] = [];
    const mintAndBurnEvents = await this.getAllEventsSentToAddress(address);
    const mintEvents = mintAndBurnEvents.filter(
      (event) => event.event === 'LogPowrCreation',
    );
    const burnEvents = mintAndBurnEvents.filter(
      (event) => event.event === 'LogPowrWithdraw',
    );

    mintEvents.forEach((mintEvent) => {
      const relatedBurns = burnEvents.filter(
        (burnEvent) =>
          burnEvent.returnValues.saleContract ===
          mintEvent.returnValues.saleContract,
      );
      const totalBurned = relatedBurns.reduce(
        (acc, burn) => acc + burn.returnValues.amount,
        0,
      );
      const totalMinted = mintEvent.returnValues.amount;

      if (totalMinted > totalBurned) {
        result.push({
          mintedPoWR: mintEvent,
          relatedBurns: relatedBurns,
          tokensStillAvailable: totalMinted - totalBurned,
        });
      }
    });
    result.sort((a, b) => a.tokensStillAvailable - b.tokensStillAvailable);
    return result;
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
