import { getSnapshot } from '@/marketData'
import { options } from '@/options'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

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
