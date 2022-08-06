// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import "./ERC20/ERC20.sol";

// See https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol
contract Forestoken is ERC20("Forestoken", "FTK") {

    uint8 private _decimals = 5;

    constructor(uint256 initialSupply) {
        // this is to give us an initial supply of tokens
        _mint(msg.sender, initialSupply);
    }

    // overriding this function because decimals was hardcoded with 18
    function decimals() public view override returns (uint8) {
        return _decimals;
    }
}