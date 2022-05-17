const { providers } = require("ethers");
import { ChainId,Token,Pair,Fetcher } from '@sushiswap-core/sdk';
const request = require('request');


let ethprice = 0
async function getEthPrice() {
    return await request('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=39M44K1IVEI2QWXV669BE81JIYUZ6JB8TQ', { json: true }, (err: any, res: any, body: any) => {
        if (err) {
            return console.log(err);
        }
        ethprice = Number(body.result.ethusd)
        console.log('ethprice',ethprice);
    });
}


async function getPair() {
    const provider = new providers.JsonRpcProvider("https://polygon-rpc.com/");
    const USDC = new Token(137, '0x2791bca1f2de4661ed88a30c99a7a9449aa84174', 18)
    const GDDY = new Token(137, '0x67eb41a14c0fe5cd701fc9d5a3d6597a72f641a6', 18)
    
    const pair: Pair = await Fetcher.fetchPairData(USDC, GDDY, provider)

    let decimals0 = pair.token0.decimals
    let decimals1 = pair.token1.decimals
    let reserve0 = Number(pair.reserve0.toFixed(decimals0))
    let reserve1 = Number(pair.reserve1.toFixed(decimals1))
    console.log('reserve0', reserve0)
    console.log('reserve1', reserve1)
    let liquidity
    if (reserve0 > reserve1) {
        liquidity = reserve1 * 2
    } else {
        liquidity = reserve0 * 2
    }
    console.log('reserveETH', liquidity)
    //console.log('reserveUSD', liquidity * bnbprice)
}
getEthPrice()
getPair()