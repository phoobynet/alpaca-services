import { stockMarketDataSource, getLatestTrade } from '../../marketData'
import { options } from '../../options'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
})

async function main() {
  const data = await getLatestTrade(stockMarketDataSource, 'AAPL')

  console.log(data)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
