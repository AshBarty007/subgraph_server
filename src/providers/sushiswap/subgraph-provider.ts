import { gql, GraphQLClient } from 'graphql-request';

const SushiSwap = new GraphQLClient('https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange');

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
        pairs(first: ${first}, orderBy: trackedReserveETH, orderDirection: desc) {
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
    let pairs: Subgraph[] = [];
    const poolsResult = await SushiSwap.request<{
        pairs: Subgraph[];
    }>(query);
    pairs = pairs.concat(poolsResult.pairs);
    return pairs;
}

