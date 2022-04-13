import { gql, GraphQLClient } from 'graphql-request';

const QuickSwap = new GraphQLClient('https://api.thegraph.com/subgraphs/name/sameepsi/quickswap06');
const SushiSwap = new GraphQLClient('https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange');
const PancakeSwap =  new GraphQLClient('https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2');
const ApeSwap = new GraphQLClient('https://api.thegraph.com/subgraphs/name/hhassan01/apeswap-subgraph');

const PolygenQuery = gql`
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

const BscQuery = gql`
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
reserveBNB
trackedReserveBNB
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
let pairs: RawV2SubgraphPool[] = [];
const poolsResult = await QuickSwap.request<{
pairs: RawV2SubgraphPool[];
}>(PolygenQuery);  
pairs = pairs.concat(poolsResult.pairs);
console.log("pairs number:",pairs.length)
}

export async function query() {
let pairs: RawV2SubgraphPool[] = [];
const poolsResult = await QuickSwap.request<{
pairs: RawV2SubgraphPool[];
}>(PolygenQuery);
pairs = pairs.concat(poolsResult.pairs);
console.log("pairs number:",pairs.length)
}

main().catch((error) => {
console.error(error);
process.exitCode = 1;
});

export class SubgraphProvider{
public async query(){
let pairs1: RawV2SubgraphPool[] = [];
const poolsResult1 = await pancakeswap.request<{
pairs: RawV2SubgraphPool[];
}>(Query);  
pairs1 = pairs1.concat(poolsResult1.pairs);
console.log(pairs1.length)
}
}
