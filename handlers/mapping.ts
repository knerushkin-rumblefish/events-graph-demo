import { BigInt } from "@graphprotocol/graph-ts"

import { Deposit } from '../types/scheme/LiquidityPool/LiquidityPool'
import { Deposit as DepositEntity } from '../types/scheme/schema'
export function handleDeposit(event: Deposit): void {
  let amount = event.params.amount
  let depositor = event.params.depositor

  let id = event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  let entity = new DepositEntity(id)
  
  entity.amount = amount
  entity.depositor = depositor.toString()

  entity.save()
}
