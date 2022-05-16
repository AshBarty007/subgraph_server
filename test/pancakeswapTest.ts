const { providers,ethers } = require("ethers");
import { Fetcher, ChainId ,Token, Pair } from '@pancakeswap/sdk';
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
    const provider = new providers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
    const WBNB = new Token(ChainId.MAINNET, '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', 18)
    const BUSD = new Token(ChainId.MAINNET, '0xe9e7cea3dedca5984780bafc599bd69add087d56', 18)
    
    const pair: Pair = await Fetcher.fetchPairData(WBNB, BUSD, provider)

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