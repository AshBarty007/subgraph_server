var http = require('http')
var graphql = require('./graphql')
var mongodb = require('mongodb')
const schedule = require('node-schedule');

var hostname = "0.0.0.0"
var port = 9001

let url = "mongodb://localhost:27017";
let MongoClient = mongodb.MongoClient;

async function UpdateData() {
    graphql.query(graphql.QuickSwap, true, 140).then(res => {
        updatePairs(res,"QuickSwap");
        // MongoClient.connect(url, function (err, db) {
        //     if (err) throw err;
        //     var dbo = db.db("BarterSwap");
        //     /*
        //         var whereStr = {};
        //         dbo.collection("QuickSwap").deleteMany(whereStr, function (err, obj) {
        //             if (err) throw err;
        //             db.close();
        //         });
        //     */
        //     dbo.collection("QuickSwap").insertMany(pairs, function (err, res) {
        //         if (err) throw err;
        //         db.close();
        //     });
        // });
    }).catch(e => { console.log(e) });
    /*
        graphql.query(graphql.SushiSwap, true, 40).then(res => {
            for (var i = 0; i < 40; i++) {
                pairs[i] = res[i]
            }
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("BarterSwap");
                var whereStr = {};
                dbo.collection("SushiSwap").deleteMany(whereStr, function (err, obj) {
                    if (err) throw err;
                    db.close();
                });
            
                dbo.collection("SushiSwap").insertMany(pairs, function (err, res) {
                    if (err) throw err;
                    db.close();
                });
            });
        }).catch(e => { console.log(e) });
    
    
        graphql.query(graphql.SushiSwap, true, 100).then(res => {
            for (var i = 0; i < 100; i++) {
                pairs[i] = res[i]
            }
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("BarterSwap");
                var whereStr = {};
                dbo.collection("ApeSwap").deleteMany(whereStr, function (err, obj) {
                    if (err) throw err;
                    db.close();
                });
            
                dbo.collection("ApeSwap").insertMany(pairs, function (err, res) {
                    if (err) throw err;
                    db.close();
                });
            });
        }).catch(e => { console.log(e) });
    
        graphql.query(graphql.SushiSwap, true, 10).then(res => {
            for (var i = 0; i < 10; i++) {
                pairs[i] = res[i]
            }
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("BarterSwap");
                var whereStr = {};
                dbo.collection("PancakeSwap").deleteMany(whereStr, function (err, obj) {
                    if (err) throw err;
                    db.close();
                });
            
                dbo.collection("PancakeSwap").insertMany(pairs, function (err, res) {
                    if (err) throw err;
                    db.close();
                });
            });
        }).catch(e => { console.log(e) });
        */
}

const scheduleTask = () => {
    schedule.scheduleJob('1 * * * * *', () => {
        UpdateData();
        console.log(new Date(), 'the pairs has updated.');
    });
}

scheduleTask();


var server = http.createServer((req, res) => {
    const http_url = req.url;
    const http_path = http_url.split('/')[1];
    console.log('path is:', http_path);
    if (http_path == '') {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("url error!");
    } else {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var result = findPairs();
            if (result != null) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(result));
            } else {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("url error!");
            }
        })
    }
});

server.listen(port, hostname, () => {
    console.log("server is running...")
})

async function updatePairs(pair,dex) {
    var conn = null;
    try {
        conn = await MongoClient.connect(url);
        console.log("connecting...");
        const test = conn.db("BarterSwap").collection(dex);
        // delete
        await test.deleteMany();
		//add
		await test.insertOne(pair);
    } catch (err) {
        console.log("error:" + err.message);
    } finally {
        if (conn != null) conn.close();
    }
}

async function findPairs() {
    var dbo = db.db("BarterSwap");
    dbo.collection("QuickSwap").find({}).toArray(function (err, result) {
        if (err) throw err;
        db.close();
        return result;
    });
}