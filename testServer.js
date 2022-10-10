// Require express and create an instance of it
const axios = require("axios");
const express = require("express");
const web3 = require("web3");
const fs = require("fs");
const path = require("path");
const app = express();

// on the request to root (localhost:3000/)
app.get("/testInfura", async function(req, res) {
  let bodyData = `{
    "jsonrpc": "2.0",
      "id": 1,
      "method": "eth_call",
      "params": [
      {
        "data": "0x06fdde03",
        "to": "0x46174d7A2Db240F9aF3Dc84d08E634F3AE586919"
      },
      "latest"
    ]
  }`;
  let result = await axios.post(`https://rinkeby.infura.io/v3/5b55ff0d83f7488bb0146a63fb49389c`, bodyData);
  console.log(result);
  res.send("<b>My</b> check console log for result");
});

// On localhost:3000/welcome
app.get("/testWeb3", async function(req, res) {
  const contractJson = JSON.parse(fs.readFileSync(path.resolve("src/server/contracts/build/Forestoken.json"), "utf8"));

  const web3Client = new web3(new web3.providers.HttpProvider(`https://sepolia.infura.io/v3/5b55ff0d83f7488bb0146a63fb49389c`));

  const contract = new web3Client.eth.Contract(contractJson.abi, "0x46174d7A2Db240F9aF3Dc84d08E634F3AE586919",{
    from: "0xb08fc792b476f2c493F407863A4d3B7DeAC9332D"
  });

  const result = await contract.methods.name().call();
  console.log(result);
  res.send("<b>Hello</b> welcome to my http server made with express");
});

// Change the 404 message modifing the middleware
app.use(function(req, res, next) {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// start the server in the port 3000 !
app.listen(3001, function() {
  console.log("Example app listening on port 3001.");
});
