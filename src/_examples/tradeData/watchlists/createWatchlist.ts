import { options } from '../../../options'
import { createWatchlist } from '../../../tradingData'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const watchlist = await createWatchlist({
    name: 'Flurgon Watchlist',
    symbols: ['F', 'TSLA'],
  })

  console.log(watchlist)
}

main().catch((e) => console.error(e))
