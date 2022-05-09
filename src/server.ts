import { createServer, IncomingMessage, ServerResponse } from 'http';
import { BarterSwapDB } from './mongodb/client'
const url = require('url')

const port = 9002;
const dbClient = new BarterSwapDB();

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    let http_url = request.url;
    let ok = url.parse(http_url, true);
    if (ok.path != '/favicon.ico') {
        response.on('error', (err) => {
            console.error(err);
        });
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end('Hello world!');
    }

});

server.listen(port);
console.log(`server is running on http://localhost:5000`)