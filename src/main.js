var http = require('http')
var graphql = require('./graphql')
var mongodb = require('mongodb')
const schedule = require('node-schedule');

var hostname = "0.0.0.0"
var port = 9001

let url = "mongodb://localhost:27017";
let MongoClient = mongodb.MongoClient;

function UpdateData() {
    graphql.query1(graphql.QuickSwap, 1, 140).then(res => {
        updatePairs(res, "QuickSwap");
    }).catch(e => { console.log(e) });

    graphql.query1(graphql.SushiSwap, 1, 40).then(res => {
        updatePairs(res, "SushiSwap");
    }).catch(e => { console.log(e) });

    graphql.query2(graphql.PancakeSwap, 2, 10).then(res => {
        updatePairs(res, "PancakeSwap");
    }).catch(e => { console.log(e) });

    graphql.query3(graphql.UniSwap_v3, 3, 10).then(res => {
        updatePairs(res, "UniSwap_v3");
    }).catch(e => { console.log(e) });

    graphql.query1(graphql.UniSwap_v2, 1, 550).then(res => {
        updatePairs(res, "UniSwap_v2");
    }).catch(e => { console.log(e) });
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
        // MongoClient.connect(url, function (err, db) {
        //     if (err) throw err;
        //     var dbo = db.db("BarterSwap");
        //     dbo.collection(http_path).find({}).toArray(function (err, result) { 
        //         if (err) throw err;
        //         if (result != null) {
        //             res.writeHead(200, { "Content-Type": "application/json" });
        //             res.end(JSON.stringify(result));
        //         } else {
        //             res.writeHead(200, { "Content-Type": "text/plain" });
        //             res.end("url error!");
        //         }
        //         db.close();
        //     });
        // });
        findPairs(http_path).then((result)=>{
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

async function updatePairs(pair, dex) {
    var conn = null;
    try {
        conn = await MongoClient.connect(url);
        const test = conn.db("BarterSwap").collection(dex);
        // delete
        await test.deleteMany();
        //add
        await test.insertMany(pair);
    } catch (err) {
        console.log("error:" + err.message);
    } finally {
        if (conn != null) conn.close();
    }
}

async function findPairs(dex) {
    var conn = null;
    var result1 = null;
    var result2 = null;
    try {
        conn = await MongoClient.connect(url);
        var test1 = conn.db("BarterSwap").collection("QuickSwap");
        result1 = await test1.find().toArray();
        var test2 = conn.db("BarterSwap").collection("SushiSwap");
        result2 = await test2.find().toArray();
	var result = {"QuickSwap":result1,"SushiSwap":result2}
	return result;
    } catch (err) {
        console.log("error:" + err.message);
    } finally {
        if (conn != null) conn.close();
    }
    //var result = {"QuickSwap":result1,"SushiSwap":result2}
    //return result;
}
