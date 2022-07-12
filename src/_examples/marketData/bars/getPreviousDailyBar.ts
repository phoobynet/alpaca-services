import { getPreviousDailyBar, stockMarketDataSource } from '@/marketData'
import { options } from '@/options'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const bar = await getPreviousDailyBar(stockMarketDataSource, 'AAPL')
  console.log(bar)
}

main().catch((e) => {
  console.error(e)
})
