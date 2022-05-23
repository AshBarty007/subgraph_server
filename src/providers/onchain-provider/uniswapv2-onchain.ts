import { Pair, Fetcher } from '@uniswap/sdk'
import { ChainId } from '../utils/chainId'
import { CHAIN_RPC} from '../utils/url'
import { providers, } from 'ethers'

export async function queryUniSwapV2OnChain(chainId: ChainId, id: string, token0Address: string, token1Address: string, price: number){
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
queryUniSwapV2OnChain(ChainId.MAINNET,"0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc","0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",2000)