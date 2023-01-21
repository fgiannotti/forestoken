<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <img src="https://user-images.githubusercontent.com/60185887/213842082-8ba00ff9-6145-447c-99e7-0f12e1583811.png"> 
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>


## Description

<img width="51" alt="image" src="https://user-images.githubusercontent.com/60185887/213842082-8ba00ff9-6145-447c-99e7-0f12e1583811.png">  



This is *Forestoken* the final project for Systems Engineering Degree at UTN.  



It is a product which empowers wood suppliers, offering a way **to generate tokens (ERC20) <img width="20" src="https://user-images.githubusercontent.com/60185887/213842588-be34ea97-0e58-4aa8-8da8-6746df11209d.png"> based on wood provided** by big suppliers. Nowadays selling wood for suppliers is a tedious and long process which we aim to improve with Forestoken.  

This repo contains a PoC. It has a backend in [Nest](https://github.com/nestjs/nest) framework using TypeScript. And the frontend in React.  

<img width="250" alt="image" src="https://user-images.githubusercontent.com/60185887/213842522-578cc06f-6685-476d-9c90-943b2ad15baa.png">

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the smart contract


```bash
node src/server/contracts/compile.js  // compile the smart contract


// if this fails, check env vars needed
node src/server/contracts/deploy.js // deploy the smart contract


node src/server/contracts/call.js // make some test calls to the smart contract
```



## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
