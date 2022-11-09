// Require express and create an instance of it
const express = require('express');
const app = express();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

// on the request to root (localhost:3000/)
app.get('/notification',jsonParser, async function (req, res) {
  console.log(JSON.stringify(req.body));
  res.send('<b>My</b> check console log for result');
});

// on the request to root (localhost:3000/)
app.post('/notification', jsonParser,async function (req, res) {
  console.log(req.body);
  res.send('<b>My</b> check console log for result');
});

app.get('/',jsonParser, async function (req, res) {
  console.log(JSON.stringify(req.body));
  res.send('<b>My</b> check console log for result');
});

// start the server in the port 3000 !
app.listen(80, function () {
  console.log('Example app listening on port 80.');
});
