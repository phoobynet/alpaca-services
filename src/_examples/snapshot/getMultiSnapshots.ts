import {
  cryptoMarketDataSource,
  getMultiSnapshots,
  MarketDataFeed,
  stockMarketDataSource,
} from '../../marketData'
import { options } from '../../options'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  let snapshots = await getMultiSnapshots(stockMarketDataSource, {
    symbols: ['AAPL', 'AMZN', 'MSFT'],
    feed: MarketDataFeed.sip,
  })

  console.log(snapshots)

  snapshots = await getMultiSnapshots(cryptoMarketDataSource, {
    symbols: ['BTCUSD', 'ETHUSD'],
    exchange: 'CBSE',
  })

  console.log(snapshots)
}

main().catch((e) => {
  console.error(e)
})
