import { getSnapshot, cryptoSource, usEquitySource } from '@/marketData'
import { options } from '@/options'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  let snapshot = await getSnapshot(cryptoSource, {
    symbol: 'BTCUSD',
    exchange: 'CBSE',
  })
  console.log(snapshot)

  snapshot = await getSnapshot(usEquitySource, {
    symbol: 'GENN',
  })
  console.log(snapshot)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
