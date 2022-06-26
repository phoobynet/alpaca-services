import { options } from '../../options'
import {
  getLatestMultiBars,
  LatestMultiBarsArgs,
  MarketDataFeed,
  stockMarketDataSource,
} from '../../marketData'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
})

async function main() {
  const args: LatestMultiBarsArgs = {
    symbols: ['AAPL', 'AMZN'],
    feed: MarketDataFeed.sip,
  }

  const result = await getLatestMultiBars(stockMarketDataSource, args)
  console.log(result)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
