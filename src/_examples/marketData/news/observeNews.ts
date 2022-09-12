import { options } from '@/options'
import { NewsArticle, observeNews } from '@/marketData'
import { CancelFn } from '@/types'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const symbols = ['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TWTR']

  const handler = (newsArticle: NewsArticle) => {
    console.log(JSON.stringify(newsArticle, null, 2))
  }

  const cancels: CancelFn[] = await Promise.all(
    symbols.map((symbol): Promise<CancelFn> => observeNews(symbol, handler)),
  )

  setTimeout(() => {
    cancels.forEach((cancel) => cancel())
    console.log('cancelled')
    process.exit(0)
  }, 120_000)
}

main().catch(console.error)
