import { gql, GraphQLClient } from 'graphql-request';

const UniSwap_V3 = new GraphQLClient('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3');

type Subgraph = {
    id: string;
    token0: {
        id: string;
        symbol: string;
    };
    token1: {
        id: string;
        symbol: string;
    };
    totalSupply: string;
    reserveETH: string;
    trackedReserveETH: string;
};

export async function query(first: number): Promise<Subgraph[]> {
    let query = gql`
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
        `
    let pairs: Subgraph[] = [];
    const poolsResult = await UniSwap_V3.request<{
        pairs: Subgraph[];
    }>(query);
    pairs = pairs.concat(poolsResult.pairs);
    return pairs;
}

