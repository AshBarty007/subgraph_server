import { createServer, IncomingMessage, ServerResponse } from 'http';
import { BarterSwapDB,TableName } from '../src/mongodb/client'
const url = require('url')

const port = 9002;
const dbClient = new BarterSwapDB();

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    let http_url = request.url;
    let ok = url.parse(http_url, true);
    if (ok.path != '/favicon.ico') {
        let str = JSON.stringify(ok.query);
        str = JSON.parse(str);
        let filter = {}
        let result
        switch (str){
            case TableName.DetailedPools:
                filter = {                        
                    name: str,
                    chainId :str,
                }
                result = dbClient.findData(TableName.DetailedPools,filter)
                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(JSON.stringify(result));
                break
            case TableName.SimplePools:
                filter = {                        
                    name: str,
                    chainId :str,
                }
                result = dbClient.findData(TableName.SimplePools,filter)
                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(JSON.stringify(result));
                break
            default:
                response.on('error', (err) => {
                    console.error(err);
                });
                response.writeHead(200, { "Content-Type": "text/plain" });
                response.end("url error!");
                break;  
        }
    }

});


server.listen(port,"0.0.0.0");
console.log(`server is running on http://localhost:9002`)