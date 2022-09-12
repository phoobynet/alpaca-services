import { initOptions } from '@/_examples/initOptions'
import { observeBars, observeQuotes, observeTrades } from '@/marketData'
import { CancelFn } from '@/types'

initOptions()

async function main() {
  const symbols = [
    'AAPL',
    'MSFT',
    'TSLA',
    'IBM',
    'F',
    'TWTR',
    'AMZN',
    'META',
    'TGT',
  ]

  const cancellers: CancelFn[] = []
  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i] as string
    cancellers.push(
      await observeTrades(
        symbol,
        (trade) => {
          console.log(trade)
        },
        500,
      ),
    )

    cancellers.push(
      await observeQuotes(
        symbol,
        (quote) => {
          console.log(quote)
        },
        500,
      ),
    )

    cancellers.push(
      await observeBars(symbol, (bar) => {
        console.log(bar)
      }),
    )
  }

  setTimeout(() => {
    cancellers.forEach((c) => c())
  }, 10_000)
}

main().catch((e) => console.error(e))
