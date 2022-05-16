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
        //console.log(str.protocol, str.chainId)
        let filter = {}
        filter = {
            name: str.protocol,
            chainId: Number(str.chainId),
        }
        dbClient.findData(TableName.DetailedPools, filter).then((result:any) => {
            if (result.updatetime - Date.parse(new Date().toString())<3000000){
                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(JSON.stringify(result));
            }else{
                //TODO
                onchain(str.protocol,result.token0.id,result.token0.id,result.id,result.token0.decimals,result.token1.decimals).then((result) => {
                    response.writeHead(200, { "Content-Type": "application/json" });
                    response.end(JSON.stringify(result));
                }).catch((err) => {
                    console.log(err)
                    dbClient.findData(TableName.SimplePools, filter).then((result) => {
                        response.writeHead(200, { "Content-Type": "application/json" });
                        response.end(JSON.stringify(result));
                    }).catch(() => {
                        response.on('error', (err) => {
                            console.error(err);
                        });
                        response.writeHead(200, { "Content-Type": "text/plain" });
                        response.end("url error!");
                    })
                })
            }

        }).catch((err) => {
            console.log(err)
            dbClient.findData(TableName.SimplePools, filter).then((result:any) => {
                //TODO
                onchain(str.protocol,result.token0.id,result.token0.id,result.id,result.token0.decimals,result.token1.decimals).then((data) => {
                    response.writeHead(200, { "Content-Type": "application/json" });
                    response.end(JSON.stringify(data));
                }).catch(() => {
                    response.writeHead(200, { "Content-Type": "application/json" });
                    response.end(JSON.stringify(result));
                })
            }).catch(() => {
                response.on('error', (err) => {
                    console.error(err);
                });
                response.writeHead(200, { "Content-Type": "text/plain" });
                response.end("url error!");
            })
        })
    }

});

server.listen(port);
console.log(`server is running ...`)

async function onchain(dexName: string,token0Adress:string,token1Adress:string,poolAdress:string,decimals0: number,decimals1: number) {
    switch (dexName) {
        case "uniswap_v2":
            return uniSwapV2OnChain(ChainId.MAINNET, token0Adress, token1Adress)
        case "uniswap_v3":
            return uniSwapV3OnChian(poolAdress,decimals0,decimals1)
        case "quickswap":
            return quickSwapOnChian(ChainId.POLYGON, token0Adress, token1Adress)
        case "sushiswap":
            return sushiSwapOnChian(ChainId.POLYGON, token0Adress, token1Adress)
        case "pancakeswap":
            return pancakeSwapOnChian(ChainId.BSC, token0Adress, token1Adress)
    }
}