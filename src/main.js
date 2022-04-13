const http = require('http')
const graphql = require('./graphql')

const hostname = "0.0.0.0"
const port = 3000
const server = http.createServer((req, res) => {
	          res.statusCode = 200
	          res.setHeader('Content-Type', 'text/plain')
	          res.end('shut down\n')
})

var url = "mongodb://localhost:27017";
var MongoClient = require('mongodb').MongoClient;
graphql.query();

MongoClient.connect(url, function(err, db) {
	    if (err) throw err;
	    console.log("Connected to MongoDB!");
	    db.close();
});

server.listen(port, () => {
	          console.log("server is running...")
})



