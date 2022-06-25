import { getSnapshot, cryptoMarketDataSource } from '../../marketData'
import { options } from '../../options'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
})

async function main() {
  const snapshot = await getSnapshot(cryptoMarketDataSource, 'BTCUSD', 'CBSE')
  console.log(snapshot)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
