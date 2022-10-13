const Web3 = require("web3");
require("dotenv").config();

// Loading the contract ABI
// (the results of a previous compilation step)
const fs = require("fs");
const path = require("path");
const buildPath = path.resolve(__dirname, "build");
const abi  = JSON.parse(fs.readFileSync('src/server/contracts/build/Forestoken.json', 'utf8')).abi;

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://${process.env.ETHEREUM_NETWORK}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
  ),
);
async function main() {
  // Configuring the connection to an Ethereum node
  console.log("Web3 connected", web3.currentProvider);
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.FORESTOKEN_PRIVATE_KEY
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
  console.log("Contract-----", contract);


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
    const tx = contract.methods.createPowr(
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        receiver.address,
        420*5,
        Date.now()
    ).send({ from: process.env.FORESTOKEN_OWNER_ADDRESS })
      .once("transactionHash", (txhash) => {
            console.log(`Mining transaction ...`);
            console.log(`https://${network}.etherscan.io/tx/${txhash}`);
        })
        .on("error", (error) => {
            console.log(error);
        });
}

main();