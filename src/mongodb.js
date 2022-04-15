var url = "mongodb://localhost:27017";
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function (err, db) {
	if (err) throw err;
	console.log("Connected to MongoDB!");
	db.close();
});

MongoClient.connect(url, function (err, db) {
	if (err) throw err;
	var dbo = db.db("BarterSwap");

	var whereStr = {};
	dbo.collection("QuickSwap").deleteMany(whereStr, function (err, obj) {
		if (err) throw err;
		db.close();
	});

	dbo.collection("QuickSwap").find({}).toArray(function (err, result) {
		if (err) throw err;
		console.log(result);
		db.close();
	});
})

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