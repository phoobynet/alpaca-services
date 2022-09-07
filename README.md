[![Build and Test CI](https://github.com/phoobynet/alpaca-services/actions/workflows/actions.yml/badge.svg)](https://github.com/phoobynet/alpaca-services/actions/workflows/actions.yml)

**Unofficial** Alpaca [Market Data API](https://alpaca.markets/docs/api-references/market-data-api/) wrapper.

The goal is to create a unified way of getting market data for either crypto or equities using the same interface.

```typescript
import { options, getLatestQuote } from '@phoobynet/alpaca-services'

// make sure you set your key and secret (just one time)
options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  // it doesn't matter if you use crypto or equities
  await getLatestQuote('AAPL').then(console.log)
  await getLatestQuote('BTC/USD').then(console.log)
}

main().catch(console.error)
```

# :warning: Warning

- This is still a work in progress (crypto changed to beta2 - which is fun).
- Things may not be working correctly, so don't bet your life savings on data from this wrapper.
- This is read-only data, it has no trading capabilities.
- Feeble amounts of unit tests have been written.
- There is no public NPM package
- It's probably not blazingly fast :wink:.

# Objectives:

- Create a unified API for crypto and equity historical and real-time data
- Make real-time data easy to consume
- To not worry about handling pagination (just use [for await...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of))
- To convert data returned to the appropriate data type (Alpaca returns `string<number>`. See [Account](https://alpaca.markets/docs/api-references/trading-api/account/) to understand what I mean.)
- To force timestamps into a consistent format (1,000th of a second)
- Get real-time market status (is it open, pre-market, etc.)

# Requirements

An Alpaca Markets SIP market data API key/secret. You can sign up at [https://app.alpaca.markets/signup](https://app.alpaca.markets/signup).

# API Documentation

Can be found [here](https://phoobynet.github.io/alpaca-services/modules.html)

# Installation

```bash
npm i @phoobynet/alpaca-services
```

## Market Data

```typescript
import { getLatestTrade } from '@phoobynet/alpaca-services'

// set your options somewhere first!

async function main() {
  await getLatestTrade('AAPL').then(console.log)
  await getLatestTrade('BTC/USD').then(console.log)
}

main().catch(console.error)
```

### latestUsEquityTrade

```json
{
  "t": "2022-07-19T08:42:54.711Z",
  "x": "K",
  "p": 147.13,
  "s": 849,
  "c": ["@", "F", "T"],
  "i": 111,
  "z": "C",
  "S": "AAPL"
}
```

### latestCryptoTrade

```json
{
  "t": "2022-07-19T08:44:18.494Z",
  "x": "CBSE",
  "p": 21863,
  "s": 0.00000714,
  "tks": "B",
  "i": 376952593,
  "S": "BTC/USD"
}
```

## Market Data - Pagination (or not)

No need to worry about handling pagination manually. Instead, you can set an absolute limit (defaults to 1,000), and let the library take care of pagination internally.

See [for await...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) for more information.

```typescript
import {
  options,
  BarAdjustment,
  BarsBetweenArgs,
  getBarsBetween,
} from '@phoobynet/alpaca-services'
import { subWeeks } from 'date-fns'

async function main() {
  const args: BarsBetweenArgs = {
    symbol: 'AAPL',
    start: subWeeks(new Date(), 1),
    end: new Date(),
    timeframe: '1Day',
    // not a page limit, but an absolute limit (defaults to 1,000)
    absoluteLimit: 10_000,
    adjustment: BarAdjustment.split,
  }

  // iterate over the bars
  for await (const bar of getBarsBetween(args)) {
    console.log(bar)
  }
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
```

## Market Data - Real Time

Simple real-time data. **Just remember to cancel the observer.**

```typescript
function main() {
  // observers return a cancel function that can be called to stop the observation
  const cancel = observeTrades(
    'BTC/USD',
    // handler
    (trade: Trade): void => {
      console.log(trade)
    },
    // throttleMs: 500,
    500,
  )

  // observe for 10 seconds
  setTimeout(() => {
    // remember to cancel the subscription
    cancel()
    process.exit(0)
  }, 10_000)
}

main()
```

## Trade Data

```typescript
import { getPreviousCalendar } from '@phoobynet/alpaca-services'

async function main() {
  // direct http request to Alpaca's API (see Repositories for how to cache data)
  const previousCalendar = await getPreviousCalendar()
  console.log(previousCalendar)

  process.exit(1)
}

main().catch((e) => {
  console.error(e)
})
```

### Result

```json
{
  "date": "2022-07-18T04:00:00.000Z",
  "open": "2022-07-18T13:30:00.000Z",
  "close": "2022-07-18T20:00:00.000Z",
  "session_open": "2022-07-18T08:00:00.000Z",
  "session_close": "2022-07-19T00:00:00.000Z"
}
```

## Market status

You can observe for US equity market status changes, or just call `getMarketStatus()` to get the current market status.

```typescript
import {
  observeMarketStatus,
  getMarketStatus,
} from '@phoobynet/alpaca-services'

async function main() {
  console.log('Get the current market status...')
  console.log(await getMarketStatus())

  console.log('\n\nObserve the market status...')
  const cancel = observeMarketStatus((marketStatus) => {
    console.log(marketStatus)
  })

  setTimeout(() => {
    console.log('Stopping...')
    cancel()
    process.exit(0)
    console.log('Stopping...DONE')
  }, 5_000)
}

main().catch(console.error)
```

### Result

```JSON
{
  "status": "preMarket",
  "nextActiveStatus": "open",
  "timeUntilNextActiveStatus": {
    "days": 0,
    "minutes": 58,
    "hours": 3,
    "seconds": 13
  },
  "localTime": "2022-08-30 10:31:46",
  "marketTime": "2022-08-30 05:31:46",
  "currentCalendar": {
    "date": "2022-08-30T04:00:00.000Z",
    "open": "2022-08-30T13:30:00.000Z",
    "close": "2022-08-30T20:00:00.000Z",
    "session_open": "2022-08-30T08:00:00.000Z",
    "session_close": "2022-08-31T00:00:00.000Z"
  },
  "previousCalendar": {
    "date": "2022-08-29T04:00:00.000Z",
    "open": "2022-08-29T13:30:00.000Z",
    "close": "2022-08-29T20:00:00.000Z",
    "session_open": "2022-08-29T08:00:00.000Z",
    "session_close": "2022-08-30T00:00:00.000Z"
  },
  "nextCalendar": {
    "date": "2022-08-31T04:00:00.000Z",
    "open": "2022-08-31T13:30:00.000Z",
    "close": "2022-08-31T20:00:00.000Z",
    "session_open": "2022-08-31T08:00:00.000Z",
    "session_close": "2022-09-01T00:00:00.000Z"
  }
}

```

### Repositories

For `Asset` and `Calendar` data, it is possible to set a custom repository in `Options`.

In this example, I'd rather not have to go back to Alpaca every time just to get a calendar. Instead, [Realm](https://www.mongodb.com/docs/realm/sdk/node/) is used to store a cache of calendars, and an implementation of `CalendarRepository` is used to get the calendar from the cache.

**NOTE: If the repository fails to provide the expected data, it DOES NOT fall back to HTTP.**

```ts
// npm i @phoobynet/alpaca-service realm date-fns lodash
import Realm from 'realm'
import {
  Calendar,
  CalendarRepository,
  getCalendarsBetween,
  getPreviousCalendar,
} from '@phoobynet/alpaca-services'
import { addMonths, endOfDay, subMonths } from 'date-fns'
import { first } from 'lodash'

// remember to set the options!

async function main() {
  // create a realm database
  const CalendarSchema = {
    name: 'Calendar',
    properties: {
      date: 'date',
      open: 'date',
      close: 'date',
      session_open: 'date',
      session_close: 'date',
    },
  }
  const realm = await Realm.open({
    schema: [CalendarSchema],
    inMemory: true,
  })

  // cache collection
  const calendars = realm.objects<Calendar>('Calendar')

  // populate if empty
  if (calendars.isEmpty()) {
    // Forcing HTTP is required for this to work.
    await getCalendarsBetween(
      subMonths(new Date(), 1),
      addMonths(new Date(), 1),
      // **** REALLY IMPORTANT - forceHttp: true, ****
      true,
    ).then((c) => {
      try {
        realm.beginTransaction()
        c.forEach((calendar) => {
          realm.create('Calendar', calendar)
        })
        realm.commitTransaction()
      } catch (e) {
        realm.cancelTransaction()
        console.error(e)
      }
    })
  }

  // wrap realms cache collection of calendars
  const calendarRepository: CalendarRepository = {
    async findAll(): Promise<Calendar[]> {
      const results: Calendar[] = []
      calendars.forEach((calendar) => {
        results.push(calendar)
      })

      return results
    },
    async findBetween(startDate: Date, endDate: Date): Promise<Calendar[]> {
      return Array.from(
        calendars.filtered('date >= $0 AND date <= $1', startDate, endDate),
      )
    },
    async find(date: Date): Promise<Calendar | undefined> {
      return first(
        calendars.filtered('date >= $0 AND date <= $1', date, endOfDay(date)),
      )
    },
  }

  // update options to include the repository
  options.patch({
    calendarRepository,
  })

  // get the previous calendar should now use the options.calendarRepository
  const previousCalendar = await getPreviousCalendar()
  console.log(previousCalendar)

  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
```
