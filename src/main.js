var http = require('http')
var graphql = require('./graphql')
var mongodb = require('mongodb')

var hostname = "0.0.0.0"
var port = 3000
var server = http.createServer((req, res) => {
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/plain')
	res.end('shut down\n')
})

let url = "mongodb://localhost:27017";
let MongoClient = mongodb.MongoClient;
var RawV2SubgraphPool = {
    id: string,
    token0: {
        id: string,
        symbol: string,
    },
    token1: {
        id: string,
        symbol: string,
    },
    totalSupply: number,
    reserveETH: number,
    trackedReserveETH: number
};

graphql.query(graphql.QuickSwap, true, 100).then(res => {
	RawV2SubgraphPool.id = res[0].id
}).catch(e => { console.log(e) });

MongoClient.connect(url, hostname, function (err, db) {
	if (err) throw err;
    var dbo = db.db("BarterSwap");
	var token0 = {id:"",symbol:""}
	var token1 = {id:"",symbol:""}
    var pair = { id: "", token0: token0, token1: token1,totalSupply: 0, reserveETH:0,trackedReserveETH:0};
    dbo.collection("QuickSwap").insertOne(pair, function(err, res) {
        if (err) throw err;
        console.log("insert successfully");
        db.close();
    });
});

server.listen(port, () => {
	console.log("server is running...")
})



