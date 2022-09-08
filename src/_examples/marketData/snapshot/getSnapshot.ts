import { getSnapshot } from '@/marketData'
import { initOptions } from '@/_examples/initOptions'

initOptions()

async function main() {
  let snapshot = await getSnapshot({
    symbol: 'BTC/USD',
  })
  console.log(snapshot)

  snapshot = await getSnapshot({
    symbol: 'GENN',
  })
  console.log(snapshot)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
