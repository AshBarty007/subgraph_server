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
    await DB.deleteData(TableName.SimplePools, { name: dexName.pancakeswap })
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
    let ret = await DB.findData(TableName.SimplePools, { name: dexName.pancakeswap })
    console.log("len", ret.length)
}
a()
b()
c()