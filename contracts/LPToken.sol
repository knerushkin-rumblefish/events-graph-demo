//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LPToken is ERC20, Ownable {
    address private minter;

    constructor(uint256 initialSupply_) ERC20("LP Token", "LPT") {
        _mint(msg.sender, initialSupply_);
    }

    function setMinter(address minter_) public onlyOwner {
      minter = minter_;
    }

    function mint(address recipient_, uint256 amount_) public {
      require(recipient_ != address(0), 'zero address not allowed');
      require(msg.sender == minter, 'not authorized to mint lp token');

      _mint(recipient_, amount_);
    }
}