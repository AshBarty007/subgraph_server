import { BarterSwapDB, TableName } from '../../mongodb/client'
import { ethPrice, dexName as swapName} from '../utils/params'
import { ChainId } from '../utils/chainId'
import { queryPancakeSwapOnChain } from './pancakeswap-onchain'
import { queryQuickSwapOnChain } from './quickswap-onchain'
import { querySushiSwapOnChain } from './sushiswap-onchain'
import { queryUniSwapV2OnChain } from './uniswapv2-onchain'
import { queryUniSwapV3OnChain } from './uniswapv3-onchain'

export async function onchainPools(dexName: swapName, chainId: ChainId) {
    let DB = new BarterSwapDB();
    let price = await ethPrice()
    let onchainQuery = function(chainId: ChainId, id: string, token0Address: string, token1Address: string, price: number): Promise<string>{return new Promise<string>(() => {})}
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
    //console.log('poolData',poolsData)
    let poolsJson = JSON.parse(poolsData)
    let len = poolsJson.length
    let data = []
    console.log(dexName)
    for (let i = 0; i < len; i++) {
        console.log(i)
        console.log('data',poolsJson[i])
        console.log('id',poolsJson[i].id)
        console.log('id0',poolsJson[i].token0.id)
        console.log('id1',poolsJson[i].token1.id)
        let id = poolsJson[i].id
        let token0 = poolsJson[i].token0.id
        let token1 = poolsJson[i].token1.id
        data[i] = await onchainQuery(chainId, id, token0, token1, price)
        console.log(data.length)
    }
    let storageData = {
        updateTime: Date.parse(new Date().toString()),
        name: dexName,
        chainId: ChainId.BSC,
        result: data,
    }
    DB.deleteData(TableName.OnChainPools, { name: dexName })
    DB.insertData(TableName.OnChainPools, storageData)
    console.log('data len',data.length)
}

function test(){
    onchainPools(swapName.pancakeswap,ChainId.BSC)
    onchainPools(swapName.quickswap,ChainId.POLYGON)
    onchainPools(swapName.sushiswap,ChainId.POLYGON)
    onchainPools(swapName.uniswap_v2,ChainId.MAINNET)
    onchainPools(swapName.uniswap_v3,ChainId.POLYGON)
    console.log('test pass')
}
test()