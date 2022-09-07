import { CancelFn } from '@/types'
import { Bar } from '@/marketData'
import { MarketDataStream } from '@/marketData/stream'
import { cleanBar } from '@/marketData/bars/helpers'

/**
 * @deprecated
 * @group Market Data
 * @category Bars
 * @param symbol
 * @param handler
 */
export const streamBars = async (
  symbol: string,
  handler: (t: Bar) => void,
): Promise<CancelFn> => {
  const cleanHandler = (data: unknown) => {
    handler(cleanBar(data as Bar))
  }
  return await MarketDataStream.subscribeTo(symbol, 'bars', cleanHandler)
}
