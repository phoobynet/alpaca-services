import { options } from '../../../options'
import { addAssetToWatchlist } from '../../../tradingData'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main(): Promise<void> {
  const watchlist = await addAssetToWatchlist({
    watchlistId: 'df8ef2bc-0b89-4d0f-a5bc-12bbef72ec6a',
    symbol: 'GME',
  })

  console.log(watchlist)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
