import { MarketDataEntity } from '../../types'

export interface Trade extends MarketDataEntity {
  x: string
  p: number
  s: number
  i: number

  // crypto only
  tks?: string

  // equity only
  c?: string[]

  // equity only
  z?: string
}
