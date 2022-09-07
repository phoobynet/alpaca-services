import { getLatestBar } from '@/marketData'
import { initOptions } from '@/_examples/initOptions'

initOptions()

async function main() {
  const cryptoBar = await getLatestBar({
    symbol: 'BTC/USD',
  })

  console.log(cryptoBar)

  const equityBar = await getLatestBar({
    symbol: 'aapl',
  })
  console.log(equityBar)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
