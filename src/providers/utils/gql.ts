import { gql } from 'graphql-request';

export enum LiquidityMoreThan90Percent {
  QuickSwap = 140,
  SushiSwap = 40,
  PancakeSwap = 10,
  ApeSwap = 100,
  UniSwap_V2 = 550,
  UniSwap_V3 = 10,
}

export function UniV2Gql(first:number, tokenType:string) {

  return gql`
{
    pairs(first: ${first}, orderBy: ${tokenType}, orderDirection: desc) {
      id
      token0 {
        id
      }
      token1 {
        id
      }
      totalSupply
      ${tokenType}
    }
}
`;

}


export function UniV3Gql(first:number) {

  return  gql`
        {
            pools(first: ${first}, orderBy: liquidity, orderDirection: desc) {
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
}

