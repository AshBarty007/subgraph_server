import { PancakeSwapSubgraphProvider } from './providers/subgraph-provider/pancakeswap-subgraph-provider'
import { QuickSwapSubgraphProvider } from './providers/subgraph-provider/quickswap-subgraph-provider'
import { SushiSwapSubgraphProvider } from './providers/subgraph-provider/sushiswap-subgraph-provider'
import { UniSwapV2SubgraphProvider } from './providers/subgraph-provider/uniswapv2-subgraph-provider'
import { UniSwapV3SubgraphProvider } from './providers/subgraph-provider/uniswapv3-subgraph-provider'

import { onchainPools } from './providers/onchain-provider/onchian-collection'

import { ChainId } from './providers/utils/chainId'
const schedule = require('node-schedule');


const PancakeSwapSubgraph = new PancakeSwapSubgraphProvider(ChainId.BSC)
const QuickSwapSubgraph = new QuickSwapSubgraphProvider(ChainId.POLYGON)
const SushiSwapSubgraph = new SushiSwapSubgraphProvider(ChainId.POLYGON)
const UniSwapV2Subgraph = new UniSwapV2SubgraphProvider(ChainId.MAINNET)
const UniSwapV3Subgraph = new UniSwapV3SubgraphProvider(ChainId.POLYGON)

const scheduleTask = () => {
    schedule.scheduleJob('* */2 * * * *', () => {
        PancakeSwapSubgraph.quickGetPools()
        QuickSwapSubgraph.quickGetPools()
        SushiSwapSubgraph.quickGetPools()
        UniSwapV2Subgraph.quickGetPools()
        UniSwapV3Subgraph.quickGetPools()

        console.log(new Date(), 'the SimplePools has updated.');
    });

    schedule.scheduleJob('* */5 * * * *', () => {
        PancakeSwapSubgraph.getPools()
        QuickSwapSubgraph.getPools()
        SushiSwapSubgraph.getPools()
        UniSwapV2Subgraph.getPools()
        UniSwapV3Subgraph.getPools()

        console.log(new Date(), 'the DetailedPoolsTable have updated.');
    });

    // schedule.scheduleJob('* */5 * * * *', () => {

    //     PancakeSwapOnChainQuery(ChainId.BSC,'','')
    //     QuickSwapOnChainQuery(ChainId.POLYGON,'','')
    //     SushiSwapOnChainQuery(ChainId.POLYGON,'','')
    //     UniSwapV2OnChainQuery(ChainId.MAINNET,'','')
    //     UniSwapV3OnChainQuery(ChainId.POLYGON,'','','')

    //     console.log(new Date(), 'the OnChainPoolsTable have updated.');
    // });
}

scheduleTask();

