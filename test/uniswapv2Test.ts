import { ChainId, Token, WETH, Pair, TokenAmount, Fetcher, ETHER } from '@uniswap/sdk'
import { computePoolAddress, FeeAmount, Pool } from '@uniswap/v3-sdk';
import { ethers } from 'ethers'
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
    //const provider = new ethers.providers.InfuraProvider(ChainId.MAINNET,'407d44ef59914b8dbce305871853489f')
    //ethers.getDefaultProvider();
    const provider = new ethers.providers.JsonRpcProvider('https://api.mycryptoapi.com/eth')
    const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)
    
    const pair: Pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId], provider)

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
    if (ethprice != 0){
        console.log('reserveUSD', liquidity * ethprice)
    }
}
getEthPrice()
getPair()

