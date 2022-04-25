import { gql } from 'graphql-request';

export enum LiquidityMoreThan90Percent {
    QuickSwap = 140,
    SushiSwap = 40,
    PancakeSwap = 10,
    ApeSwap = 100,
    UniSwap_V2 = 550,
    UniSwap_V3 = 10,
}

export let QueryPairsOfQuickSwap = gql`
{
    pairs(first: ${LiquidityMoreThan90Percent.QuickSwap}, orderBy: trackedReserveETH, orderDirection: desc) {
        id
        token0 {
            id
            symbol
        }
        token1 {
            id
            symbol
        }
        totalSupply
        reserveETH
        trackedReserveETH
    }
}
`;

export let QueryPairsOfSushiSwap = gql`
{
    pairs(first: ${LiquidityMoreThan90Percent.SushiSwap}, orderBy: trackedReserveETH, orderDirection: desc) {
        id
        token0 {
            id
            symbol
        }
        token1 {
            id
            symbol
        }
        totalSupply
        reserveETH
        trackedReserveETH
    }
}
`;

export let QueryPairsOfPancakeSwap = gql`
{
    pairs(first: ${ LiquidityMoreThan90Percent.PancakeSwap }, orderBy: trackedReserveBNB, orderDirection: desc) {
        id
        token0 {
            id
            symbol
        }
        token1 {
            id
            symbol
        }
        totalSupply
        reserveBNB
        trackedReserveBNB
    }
}
`;

export let QueryPairsOfApeSwap = gql`
{
    pairs(first: ${LiquidityMoreThan90Percent.ApeSwap}, orderBy: trackedReserveETH, orderDirection: desc) {
        id
        token0 {
            id
            symbol
        }
        token1 {
            id
            symbol
        }
        totalSupply
        reserveETH
        trackedReserveETH
    }
}
`;

export let QueryPairsOfUniSwapV2 = gql`
{
    pairs(first: ${LiquidityMoreThan90Percent.UniSwap_V2}, orderBy: trackedReserveETH, orderDirection: desc) {
        id
        token0 {
            id
            symbol
        }
        token1 {
            id
            symbol
        }
        totalSupply
        reserveETH
        trackedReserveETH
    }
}
`;

export let QueryPairsOfUniSwapV3 = gql`
{
    pools(first: ${LiquidityMoreThan90Percent.UniSwap_V3}, orderBy: liquidity, orderDirection: desc) {
      id
      feeTier
      liquidity
      token0 {
        id
        symbol
      }
      token1 {
        id
        symbol
      }
      totalValueLockedUSD
      totalValueLockedETH
    }
  }
`;