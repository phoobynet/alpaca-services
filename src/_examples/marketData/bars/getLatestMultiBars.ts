import { options } from '@/options'
import {
  cryptoSource,
  getLatestMultiBars,
  MarketDataFeed,
  usEquitySource,
} from '@/marketData'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const stockLatestMultiBars = await getLatestMultiBars(usEquitySource, {
    symbols: ['AAPL', 'AMZN'],
    feed: MarketDataFeed.sip,
  })
  console.log(stockLatestMultiBars)

  const cryptoLatestMultiBars = await getLatestMultiBars(cryptoSource, {
    symbols: ['BTCUSD', 'ETHUSD'],
    exchange: 'CBSE',
  })
  console.log(cryptoLatestMultiBars)

  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
