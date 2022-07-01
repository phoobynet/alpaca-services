import { getTradeData } from '../../http'
import { Asset, AssetRepository } from '../types'
import { getAsset } from './getAsset'

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

describe('getAsset', () => {
  it('should make request when no assetRepository is supplied', async () => {
    ;(getTradeData as jest.Mock).mockResolvedValueOnce(asset)

    await getAsset('aapl')

    expect(getTradeData).toHaveBeenCalledWith('/assets/AAPL')
  })

  it('should not make a http request if asset repository is supplied', async () => {
    const assetRepository: AssetRepository = {
      findAll: jest.fn(),
      find: jest.fn(),
    }

    await getAsset('aapl', assetRepository)

    expect(getTradeData).not.toHaveBeenCalled()
  })

  it('should call find if asset repository is supplied', async () => {
    const assetRepository: AssetRepository = {
      findAll: jest.fn(),
      find: jest.fn(),
    }

    await getAsset('aapl', assetRepository)

    expect(assetRepository.find).toHaveBeenCalledWith('AAPL')
    expect(assetRepository.find).toHaveBeenCalledTimes(1)
  })
})
