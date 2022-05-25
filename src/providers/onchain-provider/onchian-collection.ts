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
        { retries: 5, maxTimeout: 5000 }
    )
    if (price == 0) {
        console.log("fail to get eth price")
        return
    }

    let onchainQuery : Function//function (chainId: ChainId, id: string, token0Address: string, token1Address: string, price: number): Promise<string> { return new Promise<string>(() => { }) }
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
        { retries: 5, maxTimeout: 5000, onRetry: (err, retry) => { console.log("fail to get eth price, error message:", err, ",retry times:", retry) } }
    )


    let len
    try {
        poolsJson[0].result
    } catch (err) {
        console.log("fail to get date from db, data:", poolsJson[0])
        console.log("dex name:", dexName, ",error:", err)
        return
    }

    const concurrent = new Concurrent();
    if (dexName == swapName.uniswap_v3) {
        len = poolsJson[0].result.pools.length
    } else {
        len = poolsJson[0].result.pairs.length
    }

    let fns: Function[] = []
    for (let i = 0; i < len; i++) {
        let id, token0, token1
        if (dexName == swapName.uniswap_v3) {
            id = poolsJson[0].result.pools[i].id
            token0 = poolsJson[0].result.pools[i].token0.id
            token1 = poolsJson[0].result.pools[i].token1.id
        } else {
            id = poolsJson[0].result.pairs[i].id
            token0 = poolsJson[0].result.pairs[i].token0.id
            token1 = poolsJson[0].result.pairs[i].token1.id
        }
        fns[i] = onchainQuery(chainId, id, token0, token1, price)
    }

    let data = await concurrent.useRace(fns)
    let storageData = {
        updateTime: Date.parse(new Date().toString()),
        name: dexName,
        chainId: chainId,
        result: data,
    }
    console.log("storageData", storageData)
    //await DB.deleteData(TableName.OnChainPools, { name: dexName }, true)
    //await DB.insertData(TableName.OnChainPools, storageData)

}

class Concurrent {
    private maxConcurrent: number = 2;

    constructor(count: number = 2) {
        this.maxConcurrent = count;
    }
    public async useRace(fns: Function[]) {
        console.log("fns",fns)
        const runing: any[] = [];
        for (let i = 0; i < this.maxConcurrent; i++) {
            if (fns.length) {
                const fn = fns.shift()!;
                console.log("fn",fn(i))
                runing.push(fn(i));
            }
        }
        const handle = async () => {
            if (fns.length) {
                const idx = await Promise.race<number>(runing);
                const nextFn = fns.shift()!;
                runing.splice(idx, 1, nextFn(idx));
                handle();
            } else {
                return await Promise.all(runing);
            }
        };
        return handle();
    }
}

onchainPools(swapName.pancakeswap, ChainId.BSC)