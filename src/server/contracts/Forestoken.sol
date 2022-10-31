// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import "../../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

// See https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol
contract Forestoken is ERC20("Forestoken", "FTK") {

    uint8 private _decimals = 5;

    constructor(address payable sender, uint256 initialSupply) {
        // this is to give us an initial supply of tokens
        _mint(sender, initialSupply);
    }

    event LogPowrCreation(address indexed walletId, bytes32 saleContract, bytes32 depositCert, bytes32 collectionRightsContract, uint256 amount, uint256 unixTimestamp);
    event LogPowrWithdraw(address indexed walletId, bytes32 saleContract, bytes32 depositCert, bytes32 collectionRightsContract, uint256 amount, uint256 unixTimestamp);

    function createPowr(bytes32 saleContract, bytes32 depositCert, bytes32 collectionRightsContract, address walletId, uint256 amount, uint256 unixTimestamp) public {
        emit LogPowrCreation(walletId, saleContract, depositCert, collectionRightsContract, amount, unixTimestamp);
        _mint(walletId, amount);
    }

    function burnWithPowr(bytes32 saleContract, bytes32 depositCert, bytes32 collectionRightsContract, address walletId, uint256 amount, uint256 unixTimestamp) public {
        emit LogPowrWithdraw(walletId, saleContract, depositCert, collectionRightsContract, amount, unixTimestamp);
        burnFrom(walletId, amount);
    }

    // overriding this function because decimals was hardcoded with 18
    // and we support only up to 5 decimals
    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    function burnFrom(address account, uint256 amount) public virtual {
        _burn(account, amount);
    }
}