import { methods } from 'packages'

describe('Package Component', () => {
  beforeAll(() => {
    // mock addresses
    methods.addresses = [
      {
        name: 'Frist Last',
        address_line1: '91 Tuscarora Cres NW',
        city: 'Calgary',
        state: 'AB',
        country: 'Canada',
        mobile: '7808622275'
      },
      {
        name: '曹谦',
        address_line1: '陈家村 #68 4-4-1',
        city: '宝鸡',
        state: '陕西',
        country: '中国',
        phone: '09173612554'
      },
      {
        name: '郭强',
        address_line1: '静安镇 #1',
        city: '徐州',
        state: '江西',
        country: '中国',
        phone: '09173612554'
      }
    ]
  })

  it('can search address', () => {
    expect(typeof methods.searchAddress).toBe('function')
    const addrs = methods.searchAddress('曹谦')
    expect(addrs.length).toEqual(1)
    expect(addrs[0].name).toEqual('曹谦')
  })

  it('returns all search results', () => {
    const addrs = methods.searchAddress('中国')
    expect(addrs.length).toEqual(2)
  })

  it('returns distinct results', () => {
    const addrs = methods.searchAddress('中国 曹谦')
    expect(addrs.length).toEqual(2)

    expect(addrs[0].name).not.toEqual(addrs[1].name)
    expect(addrs[0].name === '曹谦' || addrs[0].name === '郭强').toBeTruthy()
  })

  it('returns empty arry if no results found', () => {
    const addrs = methods.searchAddress('Kevin')
    expect(addrs.length).toEqual(0)
  })
})
