var http = require('http')
var graphql = require('./graphql')
var mongodb = require('mongodb')

var hostname = "0.0.0.0"
var port = 9001

let url = "mongodb://localhost:27017";
let MongoClient = mongodb.MongoClient;

const server = http.createServer((req, res) => {
	var pairs
	var conn = null;
    try {
        conn = await MongoClient.connect(url);
        const test1 = conn.db("BarterSwap").collection("QuickSwap");
		result1 = await test1.find().toArray();
		const test2 = conn.db("BarterSwap").collection("SushiSwap");
		result2 = await test2.find().toArray();
		pairs = {"QuickSwap":result1,"SushiSwap":result2}
    } catch (err) {
        console.log("error:" + err.message);
    } finally {
        if (conn != null) conn.close();
    }
	if (pairs != null) {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(pairs));
	} else {
		res.writeHead(200, { "Content-Type": "text/plain" });
		res.end("url error!");
	}
})

server.listen(port, hostname, () => {
	console.log("server is running...")
})