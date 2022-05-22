import { PancakeSwapSubgraphProvider } from '../src/providers/subgraph-provider/pancakeswap-subgraph-provider'
import { QuickSwapSubgraphProvider } from '../src/providers/subgraph-provider/quickswap-subgraph-provider'
import { SushiSwapSubgraphProvider } from '../src/providers/subgraph-provider/sushiswap-subgraph-provider'
import { UniSwapV2SubgraphProvider } from '../src/providers/subgraph-provider/uniswapv2-subgraph-provider'
import { UniSwapV3SubgraphProvider } from '../src/providers/subgraph-provider/uniswapv3-subgraph-provider'

import { onchainPools } from '../src/providers/onchain-provider/onchian-collection'
import { ChainId } from '../src/providers/utils/chainId'
import { dexName } from '../src/providers/utils/params'

const PancakeSwapSubgraph = new PancakeSwapSubgraphProvider(ChainId.BSC)
const QuickSwapSubgraph = new QuickSwapSubgraphProvider(ChainId.POLYGON)
const SushiSwapSubgraph = new SushiSwapSubgraphProvider(ChainId.POLYGON)
const UniSwapV2Subgraph = new UniSwapV2SubgraphProvider(ChainId.MAINNET)
const UniSwapV3Subgraph = new UniSwapV3SubgraphProvider(ChainId.POLYGON)


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
    // await onchainPools(dexName.pancakeswap,ChainId.BSC)
    // await onchainPools(dexName.quickswap,ChainId.POLYGON)
    // await onchainPools(dexName.sushiswap,ChainId.POLYGON)
    await onchainPools(dexName.uniswap_v2,ChainId.MAINNET)
    await onchainPools(dexName.uniswap_v3,ChainId.POLYGON)
    console.log(new Date(), 'the OnChainPoolsTable have updated.');
}

try{
    updateOnChainPools()
}catch(err){
    console.log("fail to update DetailedPools ,error:",err)
}