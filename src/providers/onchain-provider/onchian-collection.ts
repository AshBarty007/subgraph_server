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
    const concurrent = new Concurrent(10);
    const DB = new BarterSwapDB();

    let price = 0
    await retry(
        async () => {
            price = await ethPrice()
        },
        { retries: 5, maxTimeout: 5000, onRetry: (err, retry) => {console.log("fail to get eth price ,error message:",err,",retry times:",retry)}}
    )
    if (price == 0) {
        console.log("fail to get eth price")
        return
    }

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
        { retries: 5, maxTimeout: 5000, onRetry: (err, retry) => {console.log("fail to find data ,error message:",err,",retry times:",retry)} }
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

    let data = []
    for (let i = 0; i < len; i++) {
        if (dexName == swapName.uniswap_v3) {
            let id = poolsJson[0].result.pools[i].id
            let token0 = poolsJson[0].result.pools[i].token0.id
            let token1 = poolsJson[0].result.pools[i].token1.id
            data[i] = concurrent.add(onchainQuery, chainId, id, token0, token1, price)
        } else {
            let id = poolsJson[0].result.pairs[i].id
            let token0 = poolsJson[0].result.pairs[i].token0.id
            let token1 = poolsJson[0].result.pairs[i].token1.id
            data[i] = concurrent.add(onchainQuery, chainId, id, token0, token1, price)
        }
    }
    let storageData = {
        updateTime: Date.parse(new Date().toString()),
        name: dexName,
        chainId: chainId,
        result: data,
    }
    console.log("return data:",data)
    await retry(
        async () => {
            await DB.deleteData(TableName.OnChainPools, { name: dexName }, true)
            await DB.insertData(TableName.OnChainPools, storageData)
        },
        { retries: 5, maxTimeout: 5000, onRetry: (err, retry) => {console.log("fail to storage data ,error message:",err,",retry times:",retry)}}
    )
}


class Concurrent {
    private maxConcurrent: number = 2;
    private list: Function[] = [];
    private currentCount: number = 0;

    constructor(count: number = 2) {
        this.maxConcurrent = count;
    }
    public async add(fn: Function, chainId: ChainId, id: string, token0: string, token1: string, price: number) {
        this.currentCount += 1;
        if (this.currentCount > this.maxConcurrent) {
            const wait = new Promise((resolve) => {
                this.list.push(resolve);
            });
            await wait;
        }
        let ok: any;
        await retry(
            async () => {
                ok = await fn(chainId, id, token0, token1, price);
            },
            { retries: 2, maxTimeout: 5000, onRetry: (err, retry) => { console.log("fail to get pair,id:", id, "error message:", err, ",retry times:", retry) } }
        )
        this.currentCount -= 1;
        if (this.list.length) {
            const resolveHandler = this.list.shift()!;
            resolveHandler();
        }
        return ok
    }
}

onchainPools(swapName.uniswap_v2,ChainId.MAINNET)