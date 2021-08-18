//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ExtendedERC20 is ERC20 {
  
    uint8 private _decimals;

    constructor(
      string memory name_,
      string memory symbol_,
      uint8 decimals_,
      uint256 initialSupply_
    ) ERC20(name_, symbol_)  {
        _mint(msg.sender, initialSupply_);

        _decimals = decimals_;
    }

    function decimals() public view override returns(uint8) {
      return _decimals;
    }

}