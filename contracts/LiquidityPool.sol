//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./LPToken.sol";

contract LiquidityPool {
  using SafeMath for uint256;

  LPToken lpToken;
  IERC20 underlyingToken;

  uint256 balance;

  event LiquidityPoolCreated(
    address lpTokenAddress,
    address underlyingTokenAddress
  );

  event Deposit(
      address depositor,
      uint256 amount
  );


  constructor(address lpToken_, address underlyingToken_) {
    lpToken = LPToken(lpToken_);

    underlyingToken = ERC20(underlyingToken_);

    emit LiquidityPoolCreated(lpToken_, underlyingToken_);
  }

  function deposit(uint256 amount_) public {
    require(underlyingToken.allowance(msg.sender, address(this)) >= amount_, 'not enough allowance');
    require(underlyingToken.transferFrom(msg.sender, address(this), amount_), 'transfer do not succeed');

    // lpToken.mint(msg.sender, amount_);

    emit Deposit(msg.sender, amount_);
  }
}