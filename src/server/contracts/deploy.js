const Web3 = require("web3");

// Loading the contract ABI and Bytecode
// (the results of a previous compilation step)
const fs = require("fs");
const path = require("path");

async function main() {
    const buildPath = path.resolve(__dirname, "build");
    const { abi, bytecode } = JSON.parse(fs.readFileSync(buildPath+"/Forestoken.json"));
    // Configuring the connection to an Ethereum node
    const network = process.env.ETHEREUM_NETWORK;
    const web3 = new Web3(
        new Web3.providers.HttpProvider(
            `https://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
        )
    );
    // Creating a signing account from a private key
    const signer = web3.eth.accounts.privateKeyToAccount(
        process.env.SIGNER_PRIVATE_KEY
    );
    web3.eth.accounts.wallet.add(signer);

    // Using the signing account to deploy the contract
    const contract = new web3.eth.Contract(abi);
    contract.options.data = "0x"+bytecode;
    let options = { data: "0x"+bytecode, arguments: [signer.address, process.env.FORESTOKEN_INITIAL_SUPPLY] };
    const deployTx = contract.deploy(options);
    const deployedContract = await deployTx
        .send({
            from: signer.address,
            gas: await deployTx.estimateGas(),
        })
        .once("transactionHash", (txhash) => {
            console.log(`Mining deployment transaction ...`);
            console.log(`https://${network}.etherscan.io/tx/${txhash}`);
        });
    // The contract is now deployed on chain!
    console.log(`Contract deployed at ${deployedContract.options.address}`);
    console.log(
        `Add DEMO_CONTRACT to the.env file to store the contract address: ${deployedContract.options.address}`
    );
}

require("dotenv").config();
main();