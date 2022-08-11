import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import fs from 'fs';
import path from 'path';

// Loading the contract ABI
// (the results of a previous compilation step)
const { abi } = JSON.parse(
  fs.readFileSync(
    path.resolve('src/server/contracts/build/Forestoken.json'),
    'utf8',
  ),
);
const network = process.env.ETHEREUM_NETWORK;
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
  ),
);
const contract = new web3.eth.Contract(
  abi,
  process.env.FORESTOKEN_CONTRACT_ADDRESS,
);

@Injectable()
export class TokensService {
  constructor() {}

  public async totalSupply(): Promise<string> {
    return contract.methods.totalSupply().call();
  }

  public async symbol(): Promise<string> {
    return contract.methods.symbol().call();
  }

  public async name(): Promise<string> {
    return contract.methods.name().call();
  }

  public async balanceOf(id: string): Promise<string> {
    //Obtiene el PK desde el user
    //const { private_key } = await this.usersService.findOne(id);
    const address = web3.eth.accounts.privateKeyToAccount(
      process.env.SIGNER_PRIVATE_KEY,
    ).address;
    return contract.methods.balanceOf(address).call();
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
    const signer = web3.eth.accounts.privateKeyToAccount(
      process.env.SIGNER_PRIVATE_KEY,
    );
    web3.eth.accounts.wallet.add(signer);

    // Creating a signing account from a private key
    const receiver = web3.eth.accounts.privateKeyToAccount(
      process.env.RECEIVER_PRIVATE_KEY,
    );
    web3.eth.accounts.wallet.add(receiver);
    console.log('Accounts created', web3.eth.accounts.wallet);

    return contract.methods
      .transfer(signer.address, amount)
      .send({
        from: receiver.address,
        gas: 1000000,
      })
      .once('transactionHash', (txhash) => {
        console.log(`Mining transaction ...`);
        console.log(`https://${network}.etherscan.io/tx/${txhash}`);
      })
      .on('error', (error) => {
        console.log(error);
      });
  }
}
