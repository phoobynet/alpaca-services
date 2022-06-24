import { Bar } from './types'
import axios from 'axios'
import { options } from '../../options'

export const getLatestBar = (symbol: string): Promise<Bar> => {
  const { key, secret } = options.get()

  return axios
    .get<Bar>(`https://data.alpaca.markets/v2/stocks/${symbol}/bars/latest`, {
      headers: {
        'APCA-API-KEY-ID': key,
        'APCA-API-KEY-SECRET': secret,
      },
    })
    .then((r) => r.data)
}
