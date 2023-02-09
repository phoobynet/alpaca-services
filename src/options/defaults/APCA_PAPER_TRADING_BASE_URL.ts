import { isNode } from 'browser-or-node'

// default
let APCA_PAPER_TRADING_BASE_URL = 'https://paper-api.alpaca.markets/v2'

if (isNode) {
  if (process.env.APCA_PAPER_TRADING_BASE_URL) {
    APCA_PAPER_TRADING_BASE_URL = process.env.APCA_PAPER_TRADING_BASE_URL
  }
}

// TODO: complete the defaults
export { APCA_PAPER_TRADING_BASE_URL }
