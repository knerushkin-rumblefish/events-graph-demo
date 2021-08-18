import { deposit } from './deposit'
import { queryDepositEvents, queryCreatedLiquidityPoolEvents } from './events-query'

import { liquidityPool, underlyingToken, lpToken } from './connect'

export async function test() {
  console.log('underlyingToken', underlyingToken.address)
  console.log('liquidityPool', liquidityPool.address)
  console.log('lpToken', lpToken.address)
  
  await queryCreatedLiquidityPoolEvents(liquidityPool)

  await deposit(liquidityPool, underlyingToken)
  // await queryDepositEvents(liquidityPool)
}

test()