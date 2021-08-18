import { connectLiquidityPool, connectUnderyingToken, connectLPToken } from './contracts/deploy'

import * as Addresses from './liquidity_pool.json' 

export const underlyingToken = connectUnderyingToken(Addresses.underlyingToken)
export const liquidityPool = connectLiquidityPool(Addresses.liquidityPool)
export const lpToken = connectLPToken(Addresses.lpToken)