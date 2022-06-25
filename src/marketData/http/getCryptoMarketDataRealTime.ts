import { MarketDataRealTime } from './MarketDataRealTime'
import { getCryptoMarketDataSocket } from './getCryptoMarketDataSocket'

let cryptoMarketDataRealTime: MarketDataRealTime

export const getCryptoMarketDataRealTime = () => {
  if (!cryptoMarketDataRealTime) {
    cryptoMarketDataRealTime = new MarketDataRealTime(
      getCryptoMarketDataSocket(),
    )
  }

  return cryptoMarketDataRealTime
}
