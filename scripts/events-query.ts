import { LiquidityPool } from '../types/contracts'


export async function queryDepositEvents(liquidityPool: LiquidityPool) {
    const depositEvents = await liquidityPool.queryFilter(liquidityPool.filters.Deposit())

    depositEvents.forEach((event) => {
      console.log(event.args.depositor)
      console.log(event.args.amount)
    })
}

export async function queryCreatedLiquidityPoolEvents(liquidityPool: LiquidityPool) {
  const liquidityPoolCreatedEvents = await liquidityPool.queryFilter(liquidityPool.filters.LiquidityPoolCreated())

  liquidityPoolCreatedEvents.forEach((event) => {
    console.log(event.args.lpTokenAddress)
    console.log(event.args.underlyingTokenAddress)
  })
}
