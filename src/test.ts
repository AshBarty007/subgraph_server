import { gql, GraphQLClient } from 'graphql-request';

export const QuickSwap = new GraphQLClient('https://api.thegraph.com/subgraphs/name/sameepsi/quickswap06');
export const SushiSwap = new GraphQLClient('https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange');
export const PancakeSwap = new GraphQLClient('https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2');
export const ApeSwap = new GraphQLClient('https://api.thegraph.com/subgraphs/name/hhassan01/apeswap-subgraph');
export const UniSwap_v2 = new GraphQLClient('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2');
export const UniSwap_v3 = new GraphQLClient('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3');

type Subgraph1 = {
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

type Subgraph2 = {
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
    reserveBNB: string;
    trackedReserveBNB: string;
};

type Subgraph3 = {
    id: string;
    feeTier: string;
    liquidity: string;
    token0: {
        symbol: string;
        id: string;
    };
    token1: {
        symbol: string;
        id: string;
    };
    totalValueLockedUSD: string;
    totalValueLockedETH: string;
};

async function query1(client: GraphQLClient, first: number): Promise<Subgraph1[]> {
    let query = gql`
        {
        pairs(first: ${first},orderBy: reserveUSD, orderDirection: desc) {
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
    let pairs: Subgraph1[] = [];
    const poolsResult = await client.request<{
        pairs: Subgraph1[];
    }>(query);
    pairs = pairs.concat(poolsResult.pairs);
    console.log("receive entries",pairs)
    return pairs;
}

async function query2(client: GraphQLClient, first: number): Promise<Subgraph2[]> {
    let query = gql`
        {
        pairs(first: ${first},orderBy: reserveUSD, orderDirection: desc) {
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
    let pairs: Subgraph2[] = [];
    const poolsResult = await client.request<{
        pairs: Subgraph2[];
    }>(query);
    pairs = pairs.concat(poolsResult.pairs);
    console.log("receive entries",pairs)
    return pairs;
}

async function query3(client: GraphQLClient, first: number): Promise<Subgraph3[]> {
    let query = gql`
        {
            pools(first: ${first}, orderBy: totalValueLockedUSD, orderDirection: desc) {
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
    let pairs: Subgraph3[] = [];
    const poolsResult = await client.request<{
        pools: Subgraph3[];
    }>(query);
    pairs = pairs.concat(poolsResult.pools);
    console.log("receive entries",pairs)
    return pairs;
}

//query1(QuickSwap,10);
//query1(SushiSwap,10);
//query1(ApeSwap,10);
//query1(UniSwap_v2,10);
//query2(PancakeSwap,10);
//query3(UniSwap_v3,10);