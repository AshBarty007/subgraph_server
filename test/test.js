var http = require('http')
var URL = require('url')

var hostname = "0.0.0.0"
var port = 3000

var pair = {
	id:"111",
	total:100
}

const server = http.createServer((req, res) => {
	const url = req.url;
	const path = url.split('?')[1];
    console.log('url is:', url);
	console.log('path is:', path);
    res.writeHead(200,{"Content-Type":"application/json"});
    res.end(JSON.stringify(pair));
})

server.listen(port, hostname, () => {
	console.log("server is running...")
})

