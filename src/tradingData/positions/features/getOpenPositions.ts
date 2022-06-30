import { Position, RawPosition } from '../types'
import { getTradeData } from '../../http'
import { cleanPosition } from '../helpers'

export const getOpenPositions = async (): Promise<Position[]> =>
  getTradeData<RawPosition[]>('/positions').then((rawPositions) =>
    rawPositions.map(cleanPosition),
  )
