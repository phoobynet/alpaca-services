Provides simple functions to access historical and real-time data from Alpaca's [Market Data API](https://alpaca.markets/docs/api-references/market-data-api/).

[![Build and Test CI](https://github.com/phoobynet/alpaca-services/actions/workflows/actions.yml/badge.svg)](https://github.com/phoobynet/alpaca-services/actions/workflows/actions.yml)

# Requirements

An Alpaca Markets SIP market data API key/secret. You can sign up at [https://app.alpaca.markets/signup](https://app.alpaca.markets/signup).

# Documentation

Module documentation can be found [here](https://phoobynet.github.io/alpaca-services/modules.html)

# Installation

```bash
npm i @phoobynet/alpaca-services
```

# Hello, World!

## Market Data

```typescript
import {
  options,
  usEquitySource,
  cryptoSource,
  getLatestTrade,
} from '@phoobynet/alpaca-services'

// set global configuration options first
options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  // crypto and us equity sources share the same functions (mostly)
  // the first argument is the source of the data
  const latestUsEquityTrade = await getLatestTrade(usEquitySource, 'AAPL')
  console.log(JSON.stringify(latestUsEquityTrade, null, 2))

  const latestCryptoTrade = await getLatestTrade(cryptoSource, 'BTCUSD')
  console.log(JSON.stringify(latestCryptoTrade, null, 2))
}

main().catch((e) => {
  console.error(e)
})
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
  "S": "BTCUSD"
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
  usEquitySource,
} from '@phoobynet/alpaca-services'
import { subWeeks } from 'date-fns'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

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
  for await (const bar of getBarsBetween(usEquitySource, args)) {
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
    cryptoSource,
    'BTCUSD',
    // handler
    (trade: Trade): void => {
      console.log(JSON.stringify(trade, null, 2))
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
import { options, getPreviousCalendar } from '@phoobynet/alpaca-services'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  // direct http request to Alpaca's API (see Repositories for how to cache data)
  const previousCalendar = await getPreviousCalendar()
  console.log(JSON.stringify(previousCalendar, null, 2))

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

### Repositories

For `Asset` and `Calendar` data, it is possible to set a custom repository in `Options`.

In this example, I'd rather not have to go back to Alpaca every time just to get a calendar. Instead, [Realm](https://www.mongodb.com/docs/realm/sdk/node/) is used to store a cache of calendars, and an implementation of `CalendarRepository` is used to get the calendar from the cache.

**NOTE: If the repository fails to provide the expected data, it DOES NOT fall back to HTTP.**

```ts
// npm i @phoobynet/alpaca-service realm date-fns lodash
import Realm from 'realm'
import {
  options,
  Calendar,
  CalendarRepository,
  getCalendarsBetween,
  getPreviousCalendar,
} from '@phoobynet/alpaca-services'
import { addMonths, endOfDay, subMonths } from 'date-fns'
import { first } from 'lodash'

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

  // set global configuration options first to retrieve calendars from the cache
  // if the realm collection is empty
  options.set({
    key: process.env.APCA_API_KEY_ID as string,
    secret: process.env.APCA_API_SECRET_KEY as string,
    paper: true,
  })

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
  console.log(JSON.stringify(previousCalendar, null, 2))

  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
```
