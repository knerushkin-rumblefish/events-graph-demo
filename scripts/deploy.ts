import { transactionOverrides } from './deployment'

import { overrideAddresses } from './utils'

import { connectLPToken, deployLiquidityPool, deployLPToken, deployUnderyingToken } from './contracts/deploy';


export async function deploy() {
  const underlyingToken = await deployUnderyingToken()
  const lpToken = await deployLPToken()

  const lpTokenContract = connectLPToken(lpToken)


  const liquidityPool = await deployLiquidityPool(lpToken, underlyingToken)

  const transactionResult = await lpTokenContract.setMinter(liquidityPool, transactionOverrides)
  await transactionResult.wait();

  overrideAddresses({
    underlyingToken,
    lpToken,
    liquidityPool,
  }, 'liquidity_pool.json')
}

deploy()
