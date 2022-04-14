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
var pair = {
    id: "",
    token0: {
        id: "",
        symbol: "",
    },
    token1: {
        id: "",
        symbol: "",
    },
    totalSupply: "",
    reserveETH: "",
    trackedReserveETH: ""
};
var pairs = {pair,pair};

graphql.query(graphql.QuickSwap, true, 10).then(res => {
    for(var i=0;i<10;i++){
        pairs[i] = res[i]
    }
}).catch(e => { console.log(e) });

MongoClient.connect(url, hostname, function (err, db) {
	if (err) throw err;
    for(var i=0;i<10;i++){
        var dbo = db.db("BarterSwap");
        var token0 = {id:pairs[i].token0.id,symbol:pairs[i].token0.symbol}
        var token1 = {id:pairs[i].token1.id,symbol:pairs[i].token1.symbol}
        var pair = { id: pairs[i].id, token0: token0, token1: token1,totalSupply: pairs[i].totalSupply, reserveETH:pairs[i].reserveETH,trackedReserveETH:pairs[i].trackedReserveETH};
        dbo.collection("QuickSwap").insertOne(pair, function(err, res) {
            if (err) throw err;
            console.log("insert result:",res);
            db.close();
        });
    }

});

server.listen(port, () => {
	console.log("server is running...")
})



