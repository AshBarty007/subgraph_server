import { BarterSwapDB, TableName } from '../../mongodb/client'
import { ethPrice, dexName as swapName } from '../utils/params'
import { ChainId } from '../utils/chainId'
import { queryPancakeSwapOnChain } from './pancakeswap-onchain'
import { queryQuickSwapOnChain } from './quickswap-onchain'
import { querySushiSwapOnChain } from './sushiswap-onchain'
import { queryUniSwapV2OnChain } from './uniswapv2-onchain'
import { queryUniSwapV3OnChain } from './uniswapv3-onchain'

export async function onchainPools(dexName: swapName, chainId: ChainId) {
    let DB = new BarterSwapDB();
    let price = await ethPrice()
    let onchainQuery = function (chainId: ChainId, id: string, token0Address: string, token1Address: string, price: number): Promise<string> { return new Promise<string>(() => { }) }
    switch (dexName) {
        case swapName.pancakeswap:
            onchainQuery = queryPancakeSwapOnChain
            break;
        case swapName.quickswap:
            onchainQuery = queryQuickSwapOnChain
            break;
        case swapName.sushiswap:
            onchainQuery = querySushiSwapOnChain
            break;
        case swapName.uniswap_v2:
            onchainQuery = queryUniSwapV2OnChain
            break;
        case swapName.uniswap_v3:
            onchainQuery = queryUniSwapV3OnChain
            break;
    }
    await DB.findData(TableName.SimplePools, { name: dexName }).then((poolsData) => {
        try{
            let poolsJson = JSON.parse(poolsData)
            // console.log('poolsJson', dexName, poolsJson)
            // console.log('poolsJson.result',dexName,  poolsJson[0].result)
            // console.log('poolsJson.result.pairs',dexName,  poolsJson[0].result.pairs)
            let len = poolsJson[0].result.pairs.length
            console.log('len',dexName,  len)
        }catch(err){
            console.log(dexName,err)
        }

    })



    // let data = []

    // for (let i = 0; i < len; i++) {
    //     try{
    //         let id = poolsJson[0].result.pairs[i].id
    //         let token0 = poolsJson[0].result.pairs[i].token0.id
    //         let token1 = poolsJson[0].result.pairs[i].token1.id
    //         data[i] = await onchainQuery(chainId, id, token0, token1, price)
    //         console.log("data len",data.length)
    //     }catch(err){
    //         console.log(err)
    //     }
    // }
    // let storageData = {
    //     updateTime: Date.parse(new Date().toString()),
    //     name: dexName,
    //     chainId: ChainId.BSC,
    //     result: data,
    // }
    // DB.deleteData(TableName.OnChainPools, { name: dexName })
    // DB.insertData(TableName.OnChainPools, storageData)
    // console.log('data len',data.length)
}

function test() {
    onchainPools(swapName.pancakeswap, ChainId.BSC)
    onchainPools(swapName.quickswap, ChainId.POLYGON)
    onchainPools(swapName.sushiswap, ChainId.POLYGON)
    onchainPools(swapName.uniswap_v2, ChainId.MAINNET)
    onchainPools(swapName.uniswap_v3, ChainId.POLYGON)
}
test()