import { onchainPools } from './providers/onchain-provider/onchian-collection'
import { ChainId } from './providers/utils/chainId'
import { dexName } from './providers/utils/params'
const schedule = require('node-schedule');




const scheduleTask = () => {
    schedule.scheduleJob('59 */45 * * * *', () => {
        try{
            updateOnChainPools()
        }catch(err){
            console.log("fail to update OnChainPools ,error:",err)
        }

    });
}

async function updateOnChainPools(){
    await onchainPools(dexName.pancakeswap,ChainId.BSC)
    await onchainPools(dexName.quickswap,ChainId.POLYGON)
    await onchainPools(dexName.sushiswap,ChainId.POLYGON)
    await onchainPools(dexName.uniswap_v2,ChainId.MAINNET)
    await onchainPools(dexName.uniswap_v3,ChainId.POLYGON)
    console.log(new Date(), 'the OnChainPoolsTable have updated.');
}

scheduleTask();

