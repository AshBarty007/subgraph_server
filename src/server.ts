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