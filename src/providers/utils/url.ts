
export enum ChainId {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GÖRLI = 5,
    KOVAN = 42,
    POLYGON = 137,
    BSC = 56,
  }

export const SUBGRAPH_URL_BY_SUSHISWAP: { [chainId in ChainId]?: string } = {
    [ChainId.POLYGON]:
      'https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange',
    [ChainId.MAINNET]:
      'https://api.thegraph.com/subgraphs/name/sushiswap/exchange',
  };

export const SUBGRAPH_URL_BY_PANCAKESWAP: { [chainId in ChainId]?: string } = {
    [ChainId.BSC]:
      'https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2',
  };

export const SUBGRAPH_URL_BY_QUICKSWAP: { [chainId in ChainId]?: string } = {
    [ChainId.POLYGON]:
      'https://api.thegraph.com/subgraphs/name/sameepsi/quickswap06',
  };

export const SUBGRAPH_URL_BY_APESWAP: { [chainId in ChainId]?: string } = {
    [ChainId.BSC]:
      'https://api.thegraph.com/subgraphs/name/hhassan01/apeswap-subgraph',
  };

export const SUBGRAPH_URL_BY_UNISWAP_V2: { [chainId in ChainId]?: string } = {
    [ChainId.MAINNET]:
      'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
  };

export const SUBGRAPH_URL_BY_UNISWAP_V3: { [chainId in ChainId]?: string } = {
    [ChainId.MAINNET]:
      'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
    [ChainId.RINKEBY]:
      'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-rinkeby',
    [ChainId.POLYGON]:
      'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon',
  };