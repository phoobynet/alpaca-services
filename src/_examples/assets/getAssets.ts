import { options } from '../../options'
import { getAssets } from '../../tradingData'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const assets = await getAssets()
  console.log(assets.length)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
