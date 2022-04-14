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
let pairs = [];

graphql.query(graphql.QuickSwap, true, 10).then(res => {
    for (var i = 0; i < 10; i++) {
        pairs[i] = res[i]
    }
    console.log("query number of pairs:",pairs.length)
}).catch(e => { console.log(e) });

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("BarterSwap");
    dbo.collection("QuickSwap").insertMany(pairs, function (err, res) {
        if (err) throw err;
        console.log("insert result:", res);
        db.close();
    });
});

server.listen(port, hostname, () => {
    console.log("server is running...")
})



