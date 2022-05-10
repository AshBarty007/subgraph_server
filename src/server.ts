import { createServer, IncomingMessage, ServerResponse } from 'http';
import { BarterSwapDB,TableName } from './mongodb/client'
const url = require('url')

const port = 9002;
const dbClient = new BarterSwapDB();

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    let http_url = request.url;
    let ok = url.parse(http_url, true);
    if (ok.path != '/favicon.ico') {
        let str:any = JSON.stringify(ok.query);
        str = JSON.parse(str);
        console.log(str.protocol,str.chainId)
        let filter = {}
        // let result
        // switch (str.protocol){
        //     case TableName.DetailedPools:
        //         filter = {                        
        //             name: str,
        //             chainId :str,
        //         }
        //         result = dbClient.findData(TableName.DetailedPools,filter)
        //         response.writeHead(200, { "Content-Type": "application/json" });
        //         response.end(JSON.stringify(result));
        //         break
        //     case TableName.SimplePools:
        //         filter = {                        
        //             name: str,
        //             chainId :str,
        //         }
        //         result = dbClient.findData(TableName.SimplePools,filter)
        //         response.writeHead(200, { "Content-Type": "application/json" });
        //         response.end(JSON.stringify(result));
        //         break
        //     default:
        //         response.on('error', (err) => {
        //             console.error(err);
        //         });
        //         response.writeHead(200, { "Content-Type": "text/plain" });
        //         response.end("url error!");
        //         break;  
        // }
        filter = {                        
            name: str.protocol,
            chainId: Number(str.chainId),
        }
        dbClient.findData(TableName.DetailedPools,filter).then((result)=>{
            console.log('result',filter)
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify(result));
        })
    }

});

server.listen(port);
console.log(`server is running ...`)