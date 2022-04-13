import { gql, GraphQLClient } from 'graphql-request';

//polygon dex  
const quickswap = new GraphQLClient('https://api.thegraph.com/subgraphs/name/sameepsi/quickswap06');
const sushiswap = new GraphQLClient('https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange');
//bsc dex
const pancakeswap =  new GraphQLClient('https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2');
const apeswap = new GraphQLClient('https://api.thegraph.com/subgraphs/name/hhassan01/apeswap-subgraph');

const query = gql`
{
pairs(first: 100,skip:0,orderBy: reserveUSD, orderDirection: desc) {
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

type RawV2SubgraphPool = {
id: string;
token0: {
id: string;
symbol: string;
};
token1: {
id: string;
symbol: string;
};
totalSupply:number;
reserveETH:number;
trackedReserveETH:number;
};


async function main() {
let pairs1: RawV2SubgraphPool[] = [];
const poolsResult1 = await quickswap.request<{
pairs: RawV2SubgraphPool[];
}>(query);  
pairs1 = pairs1.concat(poolsResult1.pairs);
console.log(pairs1.length)
}

main().catch((error) => {
console.error(error);
process.exitCode = 1;
});
