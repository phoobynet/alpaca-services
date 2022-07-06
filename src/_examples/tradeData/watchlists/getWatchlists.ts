import { options } from '../../../options'
import { getWatchlists } from '../../../tradingData'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const watchlists = await getWatchlists()

  console.log(watchlists)
}

main().catch((e) => console.error(e))
