import { TradingDataSocket } from '@/tradingData/streaming/http'
import { CancelFn } from '@/types'
import { TradeUpdateHandler } from '@/tradingData'

let tradingDataSocket: TradingDataSocket | undefined

/**
 * @group Trading Data
 * @category Streaming
 * @param handler
 */
export const observeTradeUpdates = (handler: TradeUpdateHandler): CancelFn => {
  if (!tradingDataSocket) {
    tradingDataSocket = TradingDataSocket.instance()
  }

  return tradingDataSocket.observe(handler)
}
