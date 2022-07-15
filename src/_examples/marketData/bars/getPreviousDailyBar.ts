import { cryptoSource, getPreviousDailyBar, usEquitySource } from '@/marketData'
import { options } from '@/options'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const stockBar = await getPreviousDailyBar(usEquitySource, {
    symbol: 'AAPL',
  })
  console.log(stockBar)

  const cryptoBar = await getPreviousDailyBar(cryptoSource, {
    symbol: 'BTCUSD',
    exchanges: ['CBSE'],
  })

  console.log(cryptoBar)
}

main().catch((e) => {
  console.error(e)
})
