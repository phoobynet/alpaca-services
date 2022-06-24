import { options } from '../../options'
import { getAsset } from '../../tradingData/assets'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
})

async function main() {
  const asset = await getAsset('AAPL')
  console.log(asset)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
