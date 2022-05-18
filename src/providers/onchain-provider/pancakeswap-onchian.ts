import { Pair, Fetcher } from '@pancakeswap/sdk'
import { ChainId } from '../utils/chainId'
import { CHAIN_RPC} from '../utils/url'
import { providers, } from 'ethers'
import { BarterSwapDB, TableName } from '../../mongodb/client'
import {ethPrice,dexName} from '../utils/params'

async function onchainQuery(chainId: ChainId, id: string, token0Address: string, token1Address: string, price: number){
    let provider = new providers.JsonRpcProvider(CHAIN_RPC[chainId]);
    const token0 = await Fetcher.fetchTokenData(Number(chainId), token0Address, provider)
    const token1 = await Fetcher.fetchTokenData(Number(chainId), token1Address, provider)
    const pair: Pair = await Fetcher.fetchPairData(token0, token1, provider)

    let reserve0 = Number(pair.reserve0.toFixed(pair.token0.decimals))
    let reserve1 = Number(pair.reserve1.toFixed(pair.token1.decimals))
    let token0Price = Number(pair.token0Price.scalar.numerator.toString()) / Number(pair.token0Price.scalar.denominator.toString()) * Number(pair.token0Price.numerator.toString()) / Number(pair.token0Price.denominator.toString())
    let token1Price = Number(pair.token1Price.scalar.numerator.toString()) / Number(pair.token1Price.scalar.denominator.toString()) * Number(pair.token1Price.numerator.toString()) / Number(pair.token1Price.denominator.toString())

    let reserveETH
    if (reserve0 > reserve1) {
        reserveETH = reserve1 * 2
    } else {
        reserveETH = reserve0 * 2
    }
    let reserveUSD
    if (price>0){
        reserveUSD = reserveETH * price
    }
    let result = {
        id,
        reserve0,
        reserve1,
        reserveUSD,
        reserveETH,
        token0Price,
        token1Price,
        token0: {
            id: token0.address,
            decimals: token0.decimals
        },
        token1: {
            id: token1.address,
            decimals: token1.decimals
        }
    }
    
    return JSON.stringify(result)
}

export async function onchainPools(price:number) {
    let DB = new BarterSwapDB();
    let pools : any
    await DB.findData(TableName.SimplePools, { name: dexName.pancakeswap }).then((result: any) => {
        pools = result[0].result.pairs
    })
    
    let len = pools.length
    let data = [len]
    for (let i = 0; i < len; i++) {
        let id = pools[i].id
        let token0 = pools[i].token0.id
        let token1 = pools[i].token1.id
        await onchainQuery(ChainId.BSC,id,token0,token1,price).then((res)=>{
            data[i] = res
            console.log(i,data[i])
        })
    }
    let storageData = {
        updateTime: Date.parse(new Date().toString()),
        name: dexName.pancakeswap,
        chainId: ChainId.BSC,
        result: data,
    }
    DB.deleteData(TableName.OnChainPools, { name: dexName.pancakeswap })
    DB.insertData(TableName.OnChainPools, storageData)
    console.log('data',storageData)
}

async function a(){
let price = await ethPrice()
let pools = await onchainPools(price)
//let data = await onchainQuery(ChainId.BSC,'0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56','0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',price)
console.log('price',price)
console.log('pools',pools)
}
a()