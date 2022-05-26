import { BarterSwapDB, TableName } from '../../mongodb/client'
import { ethPrice, dexName as swapName } from '../utils/params'
import { ChainId } from '../utils/chainId'
import { queryPancakeSwapOnChain } from './pancakeswap-onchain'
import { queryQuickSwapOnChain } from './quickswap-onchain'
import { querySushiSwapOnChain } from './sushiswap-onchain'
import { queryUniSwapV2OnChain } from './uniswapv2-onchain'
import { queryUniSwapV3OnChain } from './uniswapv3-onchain'
import { default as retry } from 'async-retry';


export async function onchainPools(dexName: swapName, chainId: ChainId) {
    const DB = new BarterSwapDB();

    let price = 0
    await retry(
        async () => {
            price = await ethPrice()
        },
        { retries: 2, maxTimeout: 2000 }
    )

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

    let poolsJson: any
    await retry(
        async () => {
            let poolsData = await DB.findData(TableName.SimplePools, { name: dexName })
            poolsJson = JSON.parse(poolsData)
        },
        { retries: 2, maxTimeout: 2000, onRetry: (err, retry) => { console.log("fail to get eth price, error message:", err, ",retry times:", retry) } }
    )


    let len
    try {
        poolsJson[0].result
    } catch (err) {
        console.log("fail to get date from db, data:", poolsJson[0])
        console.log("dex name:", dexName, ",error:", err)
        return
    }

    if (dexName == swapName.uniswap_v3) {
        len = poolsJson[0].result.pools.length
    } else {
        len = poolsJson[0].result.pairs.length
    }

    let fns: any = []
    let wait: any = []
    let index = 0
    for (let i = 0; i < 10; i++) {
        let id:string, token0:string, token1:string
        if (dexName == swapName.uniswap_v3) {
            id = poolsJson[0].result.pools[i].id
            token0 = poolsJson[0].result.pools[i].token0.id
            token1 = poolsJson[0].result.pools[i].token1.id
        } else {
            id = poolsJson[0].result.pairs[i].id
            token0 = poolsJson[0].result.pairs[i].token0.id
            token1 = poolsJson[0].result.pairs[i].token1.id
        }
        fns[i] = onchainQuery(chainId,id,token0,token1,price)
        // if (index >10 ||i == len-1){
        //     wait.push(fns)
        //     index=index-10
        // }
        // index++
    }
    await Promise.race(fns)
    let tmp =await Promise.all(fns);
    console.log("tmp",tmp,fns.length)
    // console.log("len",wait.length,wait[0].length)
    // let result:any
    // for (let i=0;i<wait.length;i++){
    //     let tmp = await Promise.race(wait[0])
    //     console.log("tmp",tmp)
    //     result.append(tmp) 
    // }
    // console.log("result",result)

    let data = [1]
    let storageData = {
        updateTime: Date.parse(new Date().toString()),
        name: dexName,
        chainId: chainId,
        result: data,
    }
    console.log("storageData", storageData)
    //await DB.deleteData(TableName.OnChainPools, { name: dexName }, true).then(()=>{DB.insertData(TableName.OnChainPools, storageData)}).catch(()=>{console.log("fail to delete data,table name",TableName.OnChainPools)})           
}

onchainPools(swapName.uniswap_v2, ChainId.MAINNET)