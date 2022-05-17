import { PancakeSwapSubgraphProvider } from './providers/pancakeswap-subgraph-provider'
import { QuickSwapSubgraphProvider } from './providers/quickswap-subgraph-provider'
import { SushiSwapSubgraphProvider } from './providers/sushiswap-subgraph-provider'
import { UniSwapV2SubgraphProvider } from './providers/uniswapv2-subgraph-provider'
import { UniSwapV3SubgraphProvider } from './providers/uniswapv3-subgraph-provider'

import { onchainQuery as PancakeSwapOnChainQuery } from './onchain/pancakeswap-onchian'
import { onchainQuery as QuickSwapOnChainQuery} from './onchain/quickswap-onchian'
import { onchainQuery as SushiSwapOnChainQuery} from './onchain/sushiswap-onchian'
import { onchainQuery as UniSwapV2OnChainQuery} from './onchain/uniswapv2-onchian'
import { onchainQuery as UniSwapV3OnChainQuery} from './onchain/uniswapv3-onchain'

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

    schedule.scheduleJob('* */5 * * * *', () => {
        PancakeSwapOnChainQuery(ChainId.MAINNET,'','')
        QuickSwapOnChainQuery(ChainId.MAINNET,'','')
        SushiSwapOnChainQuery(ChainId.MAINNET,'','')
        UniSwapV2OnChainQuery(ChainId.MAINNET,'','')
        UniSwapV3OnChainQuery(ChainId.MAINNET,'','','')

        console.log(new Date(), 'the OnChainPoolsTable have updated.');
    });
}

scheduleTask();

