import { createServer, IncomingMessage, ServerResponse } from 'http';
import { BarterSwapDB, TableName } from './mongodb/client'
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
            name: dex,
        }
        console.log('filter',filter)
        dbClient.findData(TableName.SimplePools, filter).then((result:any) => {
            console.log('result',result)
            let data = [result.length]
            let pools
            for (let i=0;i<result.length;i++){
                data[i] = result[i].result.pair
                if (i>0){
                    pools = extend(data[0],data[i])
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

function extend(target:any, source:any) {
    for (var obj in source) {
        target[obj] = source[obj];
    }
    return target;
}

server.listen(port);
console.log(`server is running ...`)