import {
  getLatestMultiQuotes,
  MarketDataFeed,
  usEquitySource,
} from '@/marketData'
import { options } from '@/options'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const data = await getLatestMultiQuotes(usEquitySource, {
    symbols: ['AAPL', 'MSFT'],
    feed: MarketDataFeed.sip,
  })

  console.log(JSON.stringify(data, null, 2))
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})