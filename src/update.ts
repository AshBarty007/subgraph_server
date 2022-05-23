import { PancakeSwapSubgraphProvider } from './providers/subgraph-provider/pancakeswap-subgraph-provider'
import { QuickSwapSubgraphProvider } from './providers/subgraph-provider/quickswap-subgraph-provider'
import { SushiSwapSubgraphProvider } from './providers/subgraph-provider/sushiswap-subgraph-provider'
import { UniSwapV2SubgraphProvider } from './providers/subgraph-provider/uniswapv2-subgraph-provider'
import { UniSwapV3SubgraphProvider } from './providers/subgraph-provider/uniswapv3-subgraph-provider'

import { onchainPools } from './providers/onchain-provider/onchian-collection'
import { ChainId } from './providers/utils/chainId'
import { dexName } from './providers/utils/params'
const schedule = require('node-schedule');


const PancakeSwapSubgraph = new PancakeSwapSubgraphProvider(ChainId.BSC)
const QuickSwapSubgraph = new QuickSwapSubgraphProvider(ChainId.POLYGON)
const SushiSwapSubgraph = new SushiSwapSubgraphProvider(ChainId.POLYGON)
const UniSwapV2Subgraph = new UniSwapV2SubgraphProvider(ChainId.MAINNET)
const UniSwapV3Subgraph = new UniSwapV3SubgraphProvider(ChainId.POLYGON)

const scheduleTask = () => {
    schedule.scheduleJob('0 */2 * * * *', () => {
        try{
            updateSimplePools()
        }catch(err){
            console.log("fail to update SimplePools ,error:",err)
        }
    });

    schedule.scheduleJob('20 */5 * * * *', () => {
        try{
            updateDetailedPools()
        }catch(err){
            console.log("fail to update DetailedPools ,error:",err)
        }

    });

    schedule.scheduleJob('40 */7 * * * *', () => {
        try{
            updateOnChainPools()
        }catch(err){
            console.log("fail to update OnChainPools ,error:",err)
        }

    });
}

async function updateSimplePools(){
    await PancakeSwapSubgraph.quickGetPools()
    await QuickSwapSubgraph.quickGetPools()
    await SushiSwapSubgraph.quickGetPools()
    await UniSwapV2Subgraph.quickGetPools()
    await UniSwapV3Subgraph.quickGetPools()
    console.log(new Date(), 'the SimplePools has updated.');
}

async function updateDetailedPools(){
    await PancakeSwapSubgraph.getPools()
    await QuickSwapSubgraph.getPools()
    await SushiSwapSubgraph.getPools()
    await UniSwapV2Subgraph.getPools()
    await UniSwapV3Subgraph.getPools()
    console.log(new Date(), 'the DetailedPoolsTable have updated.');
}

async function updateOnChainPools(){
    await onchainPools(dexName.pancakeswap,ChainId.BSC)
    await onchainPools(dexName.quickswap,ChainId.POLYGON)
    await onchainPools(dexName.sushiswap,ChainId.POLYGON)
    await onchainPools(dexName.uniswap_v2,ChainId.MAINNET)
    //await onchainPools(dexName.uniswap_v3,ChainId.POLYGON)
    console.log(new Date(), 'the OnChainPoolsTable have updated.');
}

//scheduleTask();
updateOnChainPools()
