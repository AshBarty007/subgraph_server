import { PancakeSwapSubgraphProvider } from './providers/subgraph-provider/pancakeswap-subgraph-provider'
import { QuickSwapSubgraphProvider } from './providers/subgraph-provider/quickswap-subgraph-provider'
import { SushiSwapSubgraphProvider } from './providers/subgraph-provider/sushiswap-subgraph-provider'
import { UniSwapV2SubgraphProvider } from './providers/subgraph-provider/uniswapv2-subgraph-provider'
import { UniSwapV3SubgraphProvider } from './providers/subgraph-provider/uniswapv3-subgraph-provider'

import { ChainId } from './providers/utils/chainId'
const schedule = require('node-schedule');


const PancakeSwapSubgraph = new PancakeSwapSubgraphProvider(ChainId.BSC)
const QuickSwapSubgraph = new QuickSwapSubgraphProvider(ChainId.POLYGON)
const SushiSwapSubgraph = new SushiSwapSubgraphProvider(ChainId.POLYGON)
const UniSwapV2Subgraph = new UniSwapV2SubgraphProvider(ChainId.MAINNET)
const UniSwapV3Subgraph = new UniSwapV3SubgraphProvider(ChainId.POLYGON)

const scheduleTask = () => {
    schedule.scheduleJob('30 */5 * * * *', () => {
        try{
            updateDetailedPools()
        }catch(err){
            console.log("fail to update DetailedPools ,error:",err)
        }

    });
}

async function updateDetailedPools(){
    await PancakeSwapSubgraph.getPools()
    await QuickSwapSubgraph.getPools()
    await SushiSwapSubgraph.getPools()
    await UniSwapV2Subgraph.getPools()
    await UniSwapV3Subgraph.getPools()
    console.log(new Date(), 'the DetailedPoolsTable have updated.');
}

scheduleTask();