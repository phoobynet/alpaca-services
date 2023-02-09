import { isNode } from 'browser-or-node'

// default
let APCA_MARKET_DATA_BASE_URL = 'https://data.alpaca.markets/v2'

if (isNode) {
  if (process.env.APCA_MARKET_DATA_BASE_URL) {
    APCA_MARKET_DATA_BASE_URL = process.env.APCA_MARKET_DATA_BASE_URL
  }
}

export { APCA_MARKET_DATA_BASE_URL }
