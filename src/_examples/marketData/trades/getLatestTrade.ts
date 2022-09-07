import { getLatestTrade } from '@/marketData'
import { options } from '@/options'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  // accessToken: '',
  paper: true,
})

async function main() {
  const stockLatestTrade = await getLatestTrade('AAPL')
  console.log(JSON.stringify(stockLatestTrade, null, 2))

  const cryptoLatestTrade = await getLatestTrade('BTCUSD')
  console.log(JSON.stringify(cryptoLatestTrade, null, 2))
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
