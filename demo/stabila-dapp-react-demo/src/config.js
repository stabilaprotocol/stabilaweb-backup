const env = process.env.REACT_APP_ENV;

const Config = {
  version: 'v1.0.0',
  chain: {
    privateKey: '01',
    fullHost: 'https://api.stabilapi.io'
  },
  service: {},
  contract: {
    usdt: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
  },
  defaultDecimal: 6,
  stabilaClickTime: 8,
  justSwap: 'https://justswap.org/',
  stabilascanUrl: 'https://stabilascan.org/#'
};

let devConfig = {};
if (env === 'test') {
  devConfig = {
    chain: {
      privateKey: '01',
      fullHost: 'https://api.nileex.io'
    },
    service: {},
    contract: {
      usdt: 'TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf'
    },
    justSwap: 'https://justswap.org/',
    stabilascanUrl: 'https://nile.stabilascan.org/#'
  };
}
export default Object.assign(Config, devConfig);
