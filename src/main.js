var http = require('http')
var url = require('url')
var graphql = require('./graphql')
var mongodb = require('mongodb')
const schedule = require('node-schedule');

var hostname = "0.0.0.0"
var port = 9001

const dburl = "mongodb://root:" + encodeURIComponent("Mr0s8#dFdf#8s386di2ds") + "@barterswap.cluster-ck74h9ydda33.ap-southeast-1.docdb.amazonaws.com:27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false";
let MongoClient = mongodb.MongoClient;

function UpdateData() {
    graphql.query1(graphql.QuickSwap, 140).then(res => {
        updatePairs(res, "quickswap",137);
    }).catch(e => { console.log(e) });

    graphql.query1(graphql.SushiSwap, 40).then(res => {
        updatePairs(res, "sushiswap",137);
    }).catch(e => { console.log(e) });

    graphql.query2(graphql.PancakeSwap, 10).then(res => {
        updatePairs(res, "pancakeswap",56);
    }).catch(e => { console.log(e) });

    graphql.query3(graphql.UniSwap_v3, 10).then(res => {
        updatePairs(res, "uniswap-v3",137);
    }).catch(e => { console.log(e) });

    graphql.query1(graphql.UniSwap_v2, 550).then(res => {
        updatePairs(res, "uniswap-v2",1);
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
    let http_url = req.url;
	let ok = url.parse(http_url,true);
	if (ok.path != '/favicon.ico'){
		let str = JSON.stringify(ok.query);
        str = JSON.parse(str);
        if (str.protocol != null){
			let obj = str.protocol;
			let dex = obj.split('_');
            if (dex != null){
                findPairs(dex).then((result)=>{
                    if (result != null) {
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify(result));
                    } else {
                        res.writeHead(200, { "Content-Type": "text/plain" });
                        res.end("url error!");
                    }
                })
            }else{
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("url error!");
            }
		}else{
			res.writeHead(200, { "Content-Type": "text/plain" });
			res.end("url error!");
		} 
	}
});

server.listen(port, hostname, () => {
    console.log("server is running...")
})

async function updatePairs(pairs,dex,networkID) {
    var conn = null;
	var obj = {
        dex:dex,
        networkID:networkID,
        pairs:pairs
    };
    try {
        conn = await MongoClient.connect(dburl);
        let col = conn.db("BarterSwap").collection("Pairs");
		let wherestr = {dex:dex}
		await col.deleteOne(wherestr);
        await col.insertOne(obj);
    } catch (err) {
        console.log("error:" + err.message);
    } finally {
        if (conn != null) conn.close();
    }
}

async function findPairs(dex) {
    var conn = null;
    var result = [];
    try {
        conn = await MongoClient.connect(dburl);
        let test = conn.db("BarterSwap").collection("Pairs");
        for(var i=0;i<dex.length;i++){
            let whereStr = {dex:dex}
            pairs = await test.find(whereStr).toArray();
            result.push(pairs);
        }
	    return result;
    } catch (err) {
        console.log("error:" + err.message);
    } finally {
        if (conn != null) conn.close();
    }
}