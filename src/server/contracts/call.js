const Web3 = require("web3");

// Loading the contract ABI
// (the results of a previous compilation step)
const fs = require("fs");
const path = require("path");
const buildPath = path.resolve(__dirname, "build");
const { abi } = JSON.parse(fs.readFileSync(buildPath+"/Forestoken.json"));

async function main() {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  console.log(network);
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    )
  );
  console.log("Web3 connected", web3.currentProvider);
  console.log(`Connected to ${network}`);
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.SIGNER_PRIVATE_KEY
  );
  web3.eth.accounts.wallet.add(signer);

  // Creating a signing account from a private key
  const receiver = web3.eth.accounts.privateKeyToAccount(
    process.env.RECEIVER_PRIVATE_KEY
  );
  web3.eth.accounts.wallet.add(receiver);
  console.log("Accounts created", web3.eth.accounts.wallet);

  // Creating a Contract instance
  const contract = new web3.eth.Contract(
    abi,
    // Replace this with the address of your deployed contract
    process.env.FORESTOKEN_CONTRACT_ADDRESS
  );

  //Using transaction that obtains the balance of the contract
  const balance = await contract.methods.balanceOf(signer.address).call();
  console.log(`Balance: ${balance}`);

  //Using de transaction to show totalSupply of the contract
  const totalSupply = await contract.methods.totalSupply().call();
  console.log(`Total supply: ${totalSupply}`);

  //Using transaction to show name of the contract
  const name = await contract.methods.name().call()
  console.log(`Name: ${name}`);

  //Using transaction to show symbol of the contract
  const symbol = await contract.methods.symbol().call();
  console.log(`Symbol: ${symbol}`);

  //Using transaction to transfer tokens from one account to another
  const tx = contract.methods.transfer(
    receiver.address,
    1
  ).send({
      from: signer.address,
      gas: 1000000
    })
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    })
    .on("error", (error) => {
      console.log(error);
    });
  // The transaction is now on chain!
  //console.log(`Mined in block ${receipt.blockNumber}`);

  /*
  const tx = contract.methods.echo("Hello, world!");
  const receipt = await tx
    .send({
      from: signer.address,
      gas: await tx.estimateGas(),
    })
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });
  // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`);
  */
}

require("dotenv").config();
main();