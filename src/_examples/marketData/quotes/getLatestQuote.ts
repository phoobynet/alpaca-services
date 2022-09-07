import { getLatestQuote } from '@/marketData'
import { initOptions } from '@/_examples/initOptions'
initOptions()

async function main() {
  const equityQuote = await getLatestQuote('AAPL')

  console.log(equityQuote)

  const cryptoQuote = await getLatestQuote('BTC/USD')
  console.log(cryptoQuote)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
