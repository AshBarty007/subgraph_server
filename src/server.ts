import { createServer, IncomingMessage, ServerResponse } from 'http';
import { BarterSwapDB, TableName } from './mongodb/client'
import { onchainQuery as uniSwapV2OnChain } from './onchain/uniswapv2-onchian'
import { onchainQuery as uniSwapV3OnChian } from './onchain/uniswapv3-onchain'
import { onchainQuery as quickSwapOnChian } from './onchain/quickswap-onchian'
import { onchainQuery as sushiSwapOnChian } from './onchain/sushiswap-onchian'
import { onchainQuery as pancakeSwapOnChian } from './onchain/pancakeswap-onchian'
import { ChainId } from './providers/utils/chainId'
const url = require('url')

const port = 9002;
const dbClient = new BarterSwapDB();

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    let http_url = request.url;
    let ok = url.parse(http_url, true);
    if (ok.path != '/favicon.ico') {
        let str: any = JSON.stringify(ok.query);
        str = JSON.parse(str);
        let filter = {}
        filter = {
            name: str.protocol,
            //chainId: Number(str.chainId),
        }
        dbClient.findData(TableName.SimplePools, filter).then((result:any) => {
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify(result));
        }).catch((err) => {
            console.log(err)
            response.on('error', (err) => {
                console.error(err);
            });
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.end("url error!");
        })
    }

});

server.listen(port);
console.log(`server is running ...`)

async function onchain(dexName: string,token0Adress:string,token1Adress:string,poolAdress:string) {
    switch (dexName) {
        case "uniswap_v2":
            return uniSwapV2OnChain(ChainId.MAINNET, token0Adress, token1Adress)
        case "uniswap_v3":
            return uniSwapV3OnChian(ChainId.POLYGON,poolAdress, token0Adress, token1Adress)
        case "quickswap":
            return quickSwapOnChian(ChainId.POLYGON, token0Adress, token1Adress)
        case "sushiswap":
            return sushiSwapOnChian(ChainId.POLYGON, token0Adress, token1Adress)
        case "pancakeswap":
            return pancakeSwapOnChian(ChainId.BSC, token0Adress, token1Adress)
    }
}