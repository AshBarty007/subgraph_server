import { Pair, Fetcher } from '@pancakeswap/sdk'
import { ChainId } from '../providers/utils/chainId'
import { CHAIN_RPC, ETH_PRICE_API } from '../providers/utils/url'
import { providers, } from 'ethers'
const request = require('request');
import { BarterSwapDB, TableName } from '../mongodb/client'


let ethprice = 0

export async function onchainQuery(chainId: ChainId, token0Address: string, token1Address: string) {
    let provider = new providers.JsonRpcProvider(CHAIN_RPC[chainId]);
    const token0 = await Fetcher.fetchTokenData(Number(chainId), token0Address, provider)
    const token1 = await Fetcher.fetchTokenData(Number(chainId), token1Address, provider)
    const pair: Pair = await Fetcher.fetchPairData(token0, token1, provider)

    let reserve0 = Number(pair.reserve0.toFixed(pair.token0.decimals))
    let reserve1 = Number(pair.reserve1.toFixed(pair.token1.decimals))
    let token0Price = Number(pair.token0Price.scalar.numerator.toString()) / Number(pair.token0Price.scalar.denominator.toString()) * Number(pair.token0Price.numerator.toString()) / Number(pair.token0Price.denominator.toString())
    let token1Price = Number(pair.token1Price.scalar.numerator.toString()) / Number(pair.token1Price.scalar.denominator.toString()) * Number(pair.token1Price.numerator.toString()) / Number(pair.token1Price.denominator.toString())

    let result:any
    await request(ETH_PRICE_API, { json: true }, (err: any, res: any, body: any) => {
        if (err) {
            return console.log(err);
        }
        ethprice = Number(body.result.ethusd)
        let reserveETH
        if (reserve0 > reserve1) {
            reserveETH = reserve1 * 2
        } else {
            reserveETH = reserve0 * 2
        }
        let reserveUSD
        if (ethprice != 0) {
            reserveUSD = reserveETH * ethprice
        }

        result = {
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
    }).then(()=>{
        console.log(result)
        return  result
    });

}

export async function onchainPools() {
    let DB = new BarterSwapDB();
    let pools : any
    await DB.findData(TableName.SimplePools, { name: "pancakeswap" }).then((result: any) => {
        pools = result[0].result.pairs
    })
    let len = pools.length
    let data = [len]
    for (let i = 0; i < len; i++) {
        let token0 = pools[i].token0.id
        let token1 = pools[i].token1.id
        await onchainQuery(ChainId.BSC,token0,token1).then((res)=>{
            data[i] = res
            console.log(i,data[i])
        })
    }
    let storageData = {
        updateTime: Date.parse(new Date().toString()),
        name: "pancakeswap",
        chainId: ChainId.BSC,
        result: data,
    }
    //DB.deleteData(TableName.OnChainPools, { name: "pancakeswap" })
    //DB.insertData(TableName.OnChainPools, data)
    console.log('data',storageData)
}
onchainPools()