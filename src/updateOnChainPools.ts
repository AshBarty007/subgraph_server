import { onchainPools } from './providers/onchain-provider/onchian-collection'
import { ChainId } from './providers/utils/chainId'
import { dexName } from './providers/utils/params'
const schedule = require('node-schedule');

const scheduleTask = () => {
    schedule.scheduleJob('59 */45 * * * *', () => {
        try{
            onchainPools(dexName.pancakeswap,ChainId.BSC)
            onchainPools(dexName.quickswap,ChainId.POLYGON)
            onchainPools(dexName.sushiswap,ChainId.POLYGON)
            onchainPools(dexName.uniswap_v2,ChainId.MAINNET)
            onchainPools(dexName.uniswap_v3,ChainId.POLYGON)
        }catch(err){
            console.log("fail to update OnChainPools ,error:",err)
        }

    });
}

let start = new Date().toLocaleString()
//scheduleTask();
try{
    onchainPools(dexName.pancakeswap,ChainId.BSC)
    onchainPools(dexName.quickswap,ChainId.POLYGON)
    onchainPools(dexName.sushiswap,ChainId.POLYGON)
    onchainPools(dexName.uniswap_v2,ChainId.MAINNET)
    onchainPools(dexName.uniswap_v3,ChainId.POLYGON)
}catch(err){
    console.log("fail to update OnChainPools ,error:",err)
}finally{
    let end = new Date().toLocaleString()
    console.log(start)
    console.log(end)
}
