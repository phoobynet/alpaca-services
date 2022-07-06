import {
  getSnapshot,
  cryptoMarketDataSource,
  stockMarketDataSource,
  MarketDataFeed,
} from '../../../marketData'
import { options } from '../../../options'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  let snapshot = await getSnapshot(cryptoMarketDataSource, {
    symbol: 'BTCUSD',
    exchange: 'CBSE',
  })
  console.log(snapshot)

  snapshot = await getSnapshot(stockMarketDataSource, {
    symbol: 'AAPL',
    feed: MarketDataFeed.sip,
  })
  console.log(snapshot)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
