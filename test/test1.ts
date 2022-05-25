import { LiquidityMoreThan90Percent, quickQueryV2PoolGQL } from '../src/providers/utils/gql'
import { RawBNBV2SubgraphPool } from '../src/providers/utils/interfaces'
import { BarterSwapDB, TableName } from '../src/mongodb/client'
import { ChainId } from '../src/providers/utils/chainId'
import { dexName } from '../src/providers/utils/params'
import { GraphQLClient } from 'graphql-request';
import { SUBGRAPH_URL_BY_PANCAKESWAP } from '../src/providers/utils/url'


let DB = new BarterSwapDB();
let subgraphUrl = SUBGRAPH_URL_BY_PANCAKESWAP[ChainId.BSC]
if (!subgraphUrl) {
throw new Error(`No subgraph url for chain id: ${ChainId.BSC}`);
}
let client = new GraphQLClient(subgraphUrl);


async function a(){
await DB.deleteData(TableName.SimplePools, { name: {"$in":[dexName.pancakeswap,dexName.sushiswap,dexName.quickswap,dexName.uniswap_v2,dexName.uniswap_v3]} }).then(()=>{console.log("delete")})
}
async function b() {
await client.request<{
pairs: RawBNBV2SubgraphPool[];
}>(quickQueryV2PoolGQL(LiquidityMoreThan90Percent.PancakeSwap, 'BNB')).then((res) => {
let data = {
updateTime: Date.parse(new Date().toString()),
name: dexName.pancakeswap,
chainId: ChainId.BSC,
result: res,
}
DB.insertData(TableName.SimplePools, data)
console.log("data", data.result.pairs.length)
});
}
async function c() {
let ret = await DB.findData(TableName.SimplePools, { name: {"$in":["pancakeswap","sushiswap","quickswap","uniswap_v2","uniswap_v3"]} })
let data = JSON.parse(ret)
console.log("len", data.length)
}
//a()
b()
//c()
