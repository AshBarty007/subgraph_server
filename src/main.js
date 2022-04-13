const http = require('http')
const graphql = require('./graphql')
const mongodb = require('mongodb')

const hostname = "0.0.0.0"
const port = 3000
const server = http.createServer((req, res) => {
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/plain')
	res.end('shut down\n')
})

let url = "mongodb://localhost:27017";
let MongoClient = mongodb.MongoClient;

MongoClient.connect(url, hostname, function (err, db) {
	if (err) throw err;
	console.log("Connected to MongoDB!");
	db.close();
});

graphql.query(graphql.QuickSwap, true, 100).then(res => {
	console.log(res)
}).catch(e => { console.log(e) });

server.listen(port, () => {
	console.log("server is running...")
})



