import { Pair,Fetcher } from '@royalaid/sushiswap-sdk';
import { ChainId } from '../utils/chainId'
import { CHAIN_RPC, ETH_PRICE_API } from '../utils/url'
import { providers } from 'ethers'
const request = require('request');
import { BarterSwapDB,TableName } from '../../mongodb/client'

let ethprice = 0

export async function onchainQuery(chainId: ChainId, token0Address: string, token1Address: string) {
    let DB = new BarterSwapDB();
    let provider = new providers.JsonRpcProvider(CHAIN_RPC[chainId]);
    const token0 = await Fetcher.fetchTokenData(Number(chainId), token0Address, provider)
    const token1 = await Fetcher.fetchTokenData(Number(chainId), token1Address, provider)
    const pair: Pair = await Fetcher.fetchPairData(token0, token1, provider)

    let reserve0 = Number(pair.reserve0.toFixed(pair.token0.decimals))
    let reserve1 = Number(pair.reserve1.toFixed(pair.token1.decimals))
    let token0Price = Number(pair.token0Price.scalar.numerator.toString()) / Number(pair.token0Price.scalar.denominator.toString()) * Number(pair.token0Price.numerator.toString()) / Number(pair.token0Price.denominator.toString())
    let token1Price = Number(pair.token1Price.scalar.numerator.toString()) / Number(pair.token1Price.scalar.denominator.toString()) * Number(pair.token1Price.numerator.toString()) / Number(pair.token1Price.denominator.toString())
    
    
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
    
        let result = {
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
        //console.log(result)
        let data = {
            updateTime: Date.parse(new Date().toString()),
            name: "sushiswap",
            chainId :chainId,
            result : result,
        }
        DB.deleteData(TableName.OnChainPools, {name: "quickswap"})
        DB.insertData(TableName.OnChainPools,data)
    });
}

  //onchainQuery(ChainId.POLYGON,'0x2791bca1f2de4661ed88a30c99a7a9449aa84174','0x67eb41a14c0fe5cd701fc9d5a3d6597a72f641a6')

