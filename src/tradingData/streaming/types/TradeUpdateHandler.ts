import { TradeUpdate } from '@/tradingData/streaming/types'

export type TradeUpdateHandler = (tradeUpdate: TradeUpdate) => void
