import { getLatestTrade } from '@/marketData'
import { initOptions } from '@/_examples/initOptions'

initOptions()

async function main() {
  const stockLatestTrade = await getLatestTrade('AAPL')
  console.log(JSON.stringify(stockLatestTrade, null, 2))

  const cryptoLatestTrade = await getLatestTrade('BTC/USD')
  console.log(JSON.stringify(cryptoLatestTrade, null, 2))
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
