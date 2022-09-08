import { initOptions } from '@/_examples/initOptions'
import { getDailyBar } from '@/marketData'

initOptions()

async function main() {
  await getDailyBar({ symbol: 'AAPL' }).then(console.log)
  await getDailyBar({ symbol: 'BTC/USD' }).then(console.log)
}

main().catch((e) => {
  console.error(e)
})
