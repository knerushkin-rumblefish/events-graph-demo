import { LiquidityPool } from '../types/contracts'


export async function queryDepositEvents(liquidityPool: LiquidityPool) {
    console.log('\nquery deposit event')
    const depositEvents = await liquidityPool.queryFilter(liquidityPool.filters.Deposit())

    depositEvents.forEach((event) => {
      console.log(event.args.depositor)
      console.log(event.args.amount.toString())
    })
    console.log('end query deposit event\n')
}

export async function queryCreatedLiquidityPoolEvents(liquidityPool: LiquidityPool) {
  console.log('\nquery liquidity pool created event')

  const liquidityPoolCreatedEvents = await liquidityPool.queryFilter(liquidityPool.filters.LiquidityPoolCreated())

  liquidityPoolCreatedEvents.forEach((event) => {
    console.log(event.args.lpTokenAddress)
    console.log(event.args.underlyingTokenAddress)
  })
  console.log('end query liquidity pool created event\n')
}
