import { createServer, IncomingMessage, ServerResponse } from 'http';
import { BarterSwapDB, TableName } from './mongodb/client'
import { dexName } from './providers/utils/params';
const url = require('url')

const port = 9002;
const dbClient = new BarterSwapDB();
let pools = {
    pancakeswap: null,
    quickswap: null,
    sushiswap: null,
    uniswap_v2: null,
    uniswap_v3: null,
}

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    let http_url = request.url;
    let ok = url.parse(http_url, true);
    if (ok.path != '/favicon.ico') {
        let str: any = JSON.stringify(ok.query);
        str = JSON.parse(str);
        let dex = str.protocol.split(',');
        let filter = {
            name: { "$in": dex },
        }
        dbClient.findData(TableName.SimplePools, filter).then((ret: any) => {
            let result = JSON.parse(ret)
            for (let i = 0; i < dex.length; i++) {
                try {
                    switch (dex[i]) {
                        case dexName.uniswap_v3:
                            console.log(i,result[i].name)
                            pools.uniswap_v3 = result[i].result.pools;
                            break;
                        case dexName.uniswap_v2:
                            console.log(i,result[i].name)
                            pools.uniswap_v2 = result[i].result.pairs;
                            break;
                        case dexName.sushiswap:
                            console.log(i,result[i].name)
                            pools.sushiswap = result[i].result.pairs;
                            break;
                        case dexName.quickswap:
                            console.log(i,result[i].name)
                            pools.quickswap = result[i].result.pairs;
                            break;
                        case dexName.pancakeswap:
                            console.log(i,result[i].name)
                            pools.pancakeswap = result[i].result.pairs;
                            break;
                    }
                } catch (err) {
                    console.log("error by returning db data,", err)
                }
            }
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify(pools));
        }).catch((err) => {
            console.log(err)
            response.on('error', (err) => {
                console.error(err);
            });
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.end("url error!");
        }).finally(()=>{
            pools.pancakeswap = null
            pools.sushiswap = null
            pools.uniswap_v2 = null
            pools.uniswap_v3 = null
            pools.quickswap = null
        })
    }

});


server.listen(port);
console.log(`server is running ...`)