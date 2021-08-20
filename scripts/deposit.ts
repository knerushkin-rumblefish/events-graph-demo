
import { LiquidityPool, ExtendedERC20 } from '../types/contracts'

import { BigNumber } from '@ethersproject/bignumber'
import { deployer, transactionOverrides, translateAddress } from './deployment'


export async function deposit(liquidityPool: LiquidityPool, underlyingToken: ExtendedERC20) {
  const deployerAddress = translateAddress(deployer.address)

  try {
    console.log('\nbalance')
    const balance = await underlyingToken.balanceOf(deployerAddress)
    console.log('balance', balance.toString())
    console.log('balance\n')

    const decimals = await underlyingToken.decimals()

    const multiplier = BigNumber.from(10).pow(decimals)
    const amount = BigNumber.from(10).mul(multiplier)

    if(amount.gt(balance)) {
      throw new Error('not enough balance')
    }

    const approveTransaction = await underlyingToken.approve(liquidityPool.address, amount, transactionOverrides)
    const approveReceipt = await approveTransaction.wait()

    console.log(approveReceipt.blockHash)

    const allowance = await underlyingToken.allowance(deployerAddress, liquidityPool.address, transactionOverrides)
    console.log('allowance', allowance.toString())

    const depositTransaction = await liquidityPool.deposit(amount, transactionOverrides)
    const depositReceipt = await depositTransaction.wait()
    console.log(depositReceipt.blockHash)

  } catch(error) {
    console.error(error)
  }
}
