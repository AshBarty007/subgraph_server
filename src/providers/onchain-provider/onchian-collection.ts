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

    let poolsData = await DB.findData(TableName.SimplePools, { name: dexName })
    let poolsJson = JSON.parse(poolsData)
    let len
    try{ 
        poolsJson[0].result
    }catch(err){
        console.log(poolsJson[0])
        console.log("fail to fetch",dexName,",error:",err)
        return
    }
    if (dexName == swapName.uniswap_v3){
        len = poolsJson[0].result.pools.length
    }else{
        len = poolsJson[0].result.pairs.length
    }

    let data = []
    for (let i = 0; i < len; i++) {
        if (dexName == swapName.uniswap_v3){
            let id = poolsJson[0].result.pools[i].id
            let token0 = poolsJson[0].result.pools[i].token0.id
            let token1 = poolsJson[0].result.pools[i].token1.id
            console.log(dexName,id)
            data[i] = await onchainQuery(chainId, id, token0, token1, price)
        }else{
            let id = poolsJson[0].result.pairs[i].id
            let token0 = poolsJson[0].result.pairs[i].token0.id
            let token1 = poolsJson[0].result.pairs[i].token1.id
            console.log(dexName,id)
            data[i] = await onchainQuery(chainId, id, token0, token1, price)
        }
    }
    let storageData = {
        updateTime: Date.parse(new Date().toString()),
        name: dexName,
        chainId: chainId,
        result: data,
    }
    console.log("it's okay",dexName)
    DB.deleteData(TableName.OnChainPools, { name: dexName },true)
    DB.insertData(TableName.OnChainPools, storageData)
}
