import { BigNumber, ContractFactory, ethers, Signer, constants } from 'ethers';

import { deployer, transactionOverrides } from './../deployment'

import * as LPTokenJSON from '../../artifacts/contracts/LPToken.sol/LPToken.json'
import * as LiquidityPoolJSON from '../../artifacts/contracts/LiquidityPool.sol/LiquidityPool.json'
import * as ExtendedERC20JSON from '../../artifacts/contracts/ExtendedERC20.sol/ExtendedERC20.json'


import {
  LPToken,
  LPToken__factory,
  LiquidityPool,
  LiquidityPool__factory,
  ExtendedERC20,
  ExtendedERC20__factory
} from '../../types/contracts'

export async function deployUnderyingToken(): Promise<ExtendedERC20['address']> {
  const factory = new ContractFactory(
    ExtendedERC20JSON.abi,
    ExtendedERC20JSON.bytecode,
    deployer
  )  as ExtendedERC20__factory;

  const name = 'Test Token'
  const symbol = 'TTT'
  const decimals = 18;
  const initialSupply = BigNumber.from(999).mul(BigNumber.from(10).pow(decimals))

  const deployTransaction = factory.getDeployTransaction(name, symbol, decimals, initialSupply, transactionOverrides);

  const transactionResult = await deployer.sendTransaction(deployTransaction);
  const receipt = await transactionResult.wait();

  const contractAddress = receipt.contractAddress
  
  return contractAddress
}

export function connectUnderyingToken(address: string) {

  const contract = new ethers.Contract(
    address,
    ExtendedERC20JSON.abi,
    deployer.provider
  ).connect(deployer) as ExtendedERC20;

  return contract
}

export async function deployLPToken(): Promise<LPToken['address']> {
  const factory = new ContractFactory(
    LPTokenJSON.abi,
    LPTokenJSON.bytecode,
    deployer
  )  as LPToken__factory;

  const LP_DECIMALS = 18;

  const initialSupply = BigNumber.from(999).mul(BigNumber.from(10).pow(LP_DECIMALS))

  const deployTransaction = factory.getDeployTransaction(initialSupply, transactionOverrides);

  const transactionResult = await deployer.sendTransaction(deployTransaction);
  const receipt = await transactionResult.wait();

  const contractAddress = receipt.contractAddress
  
  return contractAddress
}

export function connectLPToken(address: string) {

  const contract = new ethers.Contract(
    address,
    LPTokenJSON.abi,
    deployer.provider
  ).connect(deployer) as LPToken;

  return contract
}

export async function deployLiquidityPool(lpToken: string, underlyingToken: string): Promise<LiquidityPool['address']> {
  const factory = new ContractFactory(
    LiquidityPoolJSON.abi,
    LiquidityPoolJSON.bytecode,
    deployer
  )  as LiquidityPool__factory;

  const deployTransaction = factory.getDeployTransaction(lpToken, underlyingToken, transactionOverrides);

  const transactionResult = await deployer.sendTransaction(deployTransaction);
  const receipt = await transactionResult.wait();

  const contractAddress = receipt.contractAddress
  
  return contractAddress
}

export function connectLiquidityPool(address: string) {

  const contract = new ethers.Contract(
    address,
    LiquidityPoolJSON.abi,
    deployer.provider
  ).connect(deployer) as LiquidityPool;

  return contract
}

