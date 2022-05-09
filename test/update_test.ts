import { PancakeSwapSubgraphProvider } from '../src/providers/pancakeswap-subgraph-provider'
import { QuickSwapSubgraphProvider } from '../src/providers/quickswap-subgraph-provider'
import { ChainId } from '../src/providers/utils/chainId'
const schedule = require('node-schedule');


const PancakeSwapSubgraph = new PancakeSwapSubgraphProvider(ChainId.BSC)
const QuickSwapSubgraph = new QuickSwapSubgraphProvider(ChainId.POLYGON)

const scheduleTask = () => {
    schedule.scheduleJob('*/2 * * * * *', () => {
        PancakeSwapSubgraph.quickGetPools()
        QuickSwapSubgraph.quickGetPools()

        console.log(new Date(), 'the SimplePools has updated.');
    });

    schedule.scheduleJob('*/5 * * * * *', () => {
        PancakeSwapSubgraph.getPools()
        QuickSwapSubgraph.getPools()
        
        console.log(new Date(), 'the DetailedPoolsTable have updated.');
    });
}

scheduleTask();