import { getTradeData } from '../../http'
import { Asset, AssetRepository } from '../types'
import { getAssets } from './getAssets'

jest.mock('../../http')

const asset: Asset = {
  id: '904837e3-3b76-47ec-b432-046db621571b',
  class: 'us_equity',
  exchange: 'NASDAQ',
  name: 'Apple Inc. Common Stock',
  symbol: 'AAPL',
  status: 'active',
  tradable: true,
  marginable: true,
  shortable: true,
  easy_to_borrow: true,
  fractionable: true,
}

describe('getAssets', () => {
  it('should make request when no assetRepository is supplied', async () => {
    ;(getTradeData as jest.Mock).mockResolvedValueOnce([asset])

    await getAssets()

    expect(getTradeData).toHaveBeenCalledWith('/assets')
  })

  it('should not make a http request if asset repository is supplied', async () => {
    const assetRepository: AssetRepository = {
      findAll: jest.fn(),
      find: jest.fn(),
    }

    await getAssets(assetRepository)

    expect(getTradeData).not.toHaveBeenCalled()
  })

  it('should call findAll if asset repository is supplied', async () => {
    const assetRepository: AssetRepository = {
      findAll: jest.fn(),
      find: jest.fn(),
    }

    await getAssets(assetRepository)

    expect(assetRepository.findAll).toHaveBeenCalledTimes(1)
  })
})
