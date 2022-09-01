import { options } from '@/options'
import { getAsset } from '@/tradingData'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const asset = await getAsset('AAPL')
  console.log(asset)
  console.log(await getAsset('AAPL'))
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
