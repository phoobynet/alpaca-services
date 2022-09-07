import { getPreviousDailyBar } from '@/marketData'
import { options } from '@/options'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const stockBar = await getPreviousDailyBar({
    symbol: 'AAPL',
  })

  console.log(JSON.stringify(stockBar, null, 2))
  //
  // const cryptoBar = await getPreviousDailyBar(cryptoSource, {
  //   symbol: 'BTCUSD',
  // })
  //
  // console.log(JSON.stringify(cryptoBar, null, 2))
}

main().catch((e) => {
  console.error(e)
})
