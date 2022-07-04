import { options } from '../../options'
import {
  cryptoMarketDataSource,
  getLatestMultiBars,
  MarketDataFeed,
  stockMarketDataSource,
} from '../../marketData'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const stockLatestMultiBars = await getLatestMultiBars(stockMarketDataSource, {
    symbols: ['AAPL', 'AMZN'],
    feed: MarketDataFeed.sip,
  })
  console.log(stockLatestMultiBars)

  const cryptoLatestMultiBars = await getLatestMultiBars(
    cryptoMarketDataSource,
    {
      symbols: ['BTCUSD', 'ETHUSD'],
      exchange: 'CBSE',
    },
  )
  console.log(cryptoLatestMultiBars)

  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
