import { BarterSwapDB, TableName } from '../../mongodb/client'
import { ethPrice, dexName as swapName, dexName } from '../utils/params'
import { ChainId } from '../utils/chainId'
import { queryPancakeSwapOnChain } from './pancakeswap-onchain'
import { queryQuickSwapOnChain } from './quickswap-onchain'
import { querySushiSwapOnChain } from './sushiswap-onchain'
import { queryUniSwapV2OnChain } from './uniswapv2-onchain'
import { queryUniSwapV3OnChain } from './uniswapv3-onchain'

export async function onchainPools(price: number, dexName: swapName, chainId: ChainId) {
    let DB = new BarterSwapDB();
    let pools: any
    await DB.findData(TableName.SimplePools, { name: dexName }).then((result: any) => {
        pools = result[0].result.pairs
    })

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

    let len = pools.length
    let data = [len]
    for (let i = 0; i < len; i++) {
        let id = pools[i].id
        let token0 = pools[i].token0.id
        let token1 = pools[i].token1.id
        await onchainQuery(chainId, id, token0, token1, price).then((res) => {
            data[i] = res
            //console.log(i,data[i])
        })
    }
    let storageData = {
        updateTime: Date.parse(new Date().toString()),
        name: dexName,
        chainId: ChainId.BSC,
        result: data,
    }
    DB.deleteData(TableName.OnChainPools, { name: dexName })
    DB.insertData(TableName.OnChainPools, storageData)
    console.log('data',storageData)
}

async function a() {
    let price = await ethPrice()
    await onchainPools(price,dexName.pancakeswap,ChainId.BSC)
    console.log('price', price)
}
a()