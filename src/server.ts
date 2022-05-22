import { createServer, IncomingMessage, ServerResponse } from 'http';
import { BarterSwapDB, TableName } from './mongodb/client'
import { dexName } from './providers/utils/params';
const url = require('url')

const port = 9002;
const dbClient = new BarterSwapDB();

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    let http_url = request.url;
    let ok = url.parse(http_url, true);
    if (ok.path != '/favicon.ico') {
        let str: any = JSON.stringify(ok.query);
        str = JSON.parse(str);
        let dex = str.protocol.split(',');
        let filter = {
            name: {"$in" : dex},
        }
        console.log('filter',filter)
        dbClient.findData(TableName.SimplePools,filter).then((result:any) => {
            result = JSON.parse(result.length)
            let pools = new Map();
            for (let i=0;i<dex.length;i++){
                try{
                    //let data = JSON.parse(result[i])
                    console.log(i,result[i])
                    console.log(dex[i],dexName.uniswap_v3)
                    if (dex[i]!=dexName.uniswap_v3){
                        console.log(dex[i],result[i].result)
                        //pools.set(dex[i],result[i].result.pairs)
                    }else{
                        console.log(dex[i],result[i].result)
                        //pools.set(dex[i],result[i].result.pools)
                    }
                }catch(err){
                    console.log("error by returning db data,",err)
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
        })
    }

});


server.listen(port);
console.log(`server is running ...`)