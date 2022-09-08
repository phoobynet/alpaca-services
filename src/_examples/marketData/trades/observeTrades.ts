import { initOptions } from '@/_examples/initOptions'
import { observeTrades } from '@/marketData'

initOptions()

async function main() {
  const cancel = await observeTrades(
    'BTC/USD',
    (trade) => {
      console.log(trade)
    },
    500,
  )

  setTimeout(() => {
    cancel()
    process.exit(0)
  }, 20_000)
}

main().catch(console.error)
