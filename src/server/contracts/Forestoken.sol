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

    event LogPowrCreation(bytes32 saleContract, bytes32 depositCert, bytes32 collectionRightsContract, address walletId, uint amount, uint32 unixTimestamp);

    function createPowr(bytes32 sale_contract, bytes32 depositCert, bytes32 collectionRightsContract, address walletId, uint amount, uint32 unixTimestamp) public {
        _mint(walletId, amount);
        emit LogPowrCreation(saleContract, depositCert, collection_rights_contract, walletId, amount, unix_timestamp);
    }

    // overriding this function because decimals was hardcoded with 18
    // and we support only up to 5 decimals
    function decimals() public view override returns (uint8) {
        return _decimals;
    }
}