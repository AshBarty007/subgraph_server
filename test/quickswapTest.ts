const { providers } = require("ethers");
import { Fetcher, ChainId ,Token, Pair} from '@davidwgrossman/quickswap-sdk';
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
    const WMATIC = new Token(ChainId.MATIC, '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', 18)
    const SAND = new Token(ChainId.MATIC, '0xbbba073c31bf03b8acf7c28ef0738decf3695683', 18)
    
    const pair: Pair = await Fetcher.fetchPairData(WMATIC, SAND, provider)

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