import { PancakeSwapSubgraphProvider } from './providers/subgraph-provider/pancakeswap-subgraph-provider'
import { QuickSwapSubgraphProvider } from './providers/subgraph-provider/quickswap-subgraph-provider'
import { SushiSwapSubgraphProvider } from './providers/subgraph-provider/sushiswap-subgraph-provider'
import { UniSwapV2SubgraphProvider } from './providers/subgraph-provider/uniswapv2-subgraph-provider'
import { UniSwapV3SubgraphProvider } from './providers/subgraph-provider/uniswapv3-subgraph-provider'
import { CurveSubgraphProvider } from './providers/subgraph-provider/curvefi-subgraph-provider'
import { BalancerSubgraphProvider } from './providers/subgraph-provider/balancer-subgraph-provider'

import { ChainId } from './providers/utils/chainId'
const schedule = require('node-schedule');


const PancakeSwapSubgraph = new PancakeSwapSubgraphProvider(ChainId.BSC)
const QuickSwapSubgraph = new QuickSwapSubgraphProvider(ChainId.POLYGON)
const SushiSwapSubgraph = new SushiSwapSubgraphProvider(ChainId.POLYGON)
const UniSwapV2Subgraph = new UniSwapV2SubgraphProvider(ChainId.MAINNET)
const UniSwapV3Subgraph = new UniSwapV3SubgraphProvider(ChainId.POLYGON)
const CurveApi = new CurveSubgraphProvider(ChainId.POLYGON)
const BalancerSubgraph = new BalancerSubgraphProvider(ChainId.POLYGON)

const scheduleTask = () => {
    schedule.scheduleJob('0 */2 * * * *', () => {
        try{
            PancakeSwapSubgraph.quickGetPools()
            QuickSwapSubgraph.quickGetPools()
            SushiSwapSubgraph.quickGetPools()
            UniSwapV2Subgraph.quickGetPools()
            UniSwapV3Subgraph.quickGetPools()
            CurveApi.getPoolsByApi()
            BalancerSubgraph.quickGetPools()
            console.log(new Date(), 'the SimplePools has updated.');
        }catch(err){
            console.log("fail to update SimplePools ,error:",err)
        }
    });

}

scheduleTask();

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

process.on('unhandledRejection', (err) => {
    console.log('unhandled exception', err);
})