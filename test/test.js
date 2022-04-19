var http = require('http')
const url = "mongodb://root:" + encodeURIComponent("Mr0s8#dFdf#8s386di2ds") + "@barterswap.cluster-ck74h9ydda33.ap-southeast-1.docdb.amazonaws.com:27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false";
var MongoClient = require('mongodb').MongoClient;

var hostname = "0.0.0.0"
var port = 9002

const server = http.createServer((req, res) => {
	MongoClient.connect(url).then((conn) => {
		console.log("connecting...");
		const test = conn.db("BarterSwap");
		// add
		test.collection("QuickSwap").then(() => {
			// query
			return test.find().toArray().then((arr) => {
				console.log(arr);
			});
		}).then(() => {
			// query
			return test.collection("SushiSwap").find().toArray().then((arr) => {
				console.log(arr);
			});
		}).then(() => {
			// query
			return test.collection("ApeSwap").find().toArray().then((arr) => {
				console.log(arr);
			});
		}).catch((err) => {
			console.log("operate error:" + err.message);
		}).finally(() => {
			conn.close();
		});
	}).catch((err) => {
		console.log("connect fail",err);
	});

    res.writeHead(200,{"Content-Type":"application/json"});
    res.end(JSON.stringify(pair));
})

server.listen(port, hostname, () => {
	console.log("server is running...")
})

