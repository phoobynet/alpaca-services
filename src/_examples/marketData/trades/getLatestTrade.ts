import {
  usEquitySource,
  cryptoSource,
  getLatestTrade,
} from '../../../marketData'
import { options } from '../../../options'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const stockLatestTrade = await getLatestTrade(usEquitySource, 'AAPL')
  console.log(stockLatestTrade)

  const cryptoLatestTrade = await getLatestTrade(cryptoSource, 'BTCUSD', 'CBSE')
  console.log(cryptoLatestTrade)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
