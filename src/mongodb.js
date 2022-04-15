var url = "mongodb://localhost:27017";
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function (err, db) {
	if (err) throw err;
	console.log("Connected to MongoDB!");
	db.close();
});

var pairs = {"_id":"625806e74f8caecbc9bedc67","id":"0xedcb666e2279e02855cf3e28e8ccbfb9803e088f","token0":{"id":"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270","symbol":"WMATIC"},"token1":{"id":"0xf3f3065910a65f7c7a7cbd04871b5bef27c53e56","symbol":"DISNEY"},"totalSupply":"1732.050807568877292527","reserveETH":"48706742942.30950104510364955938377","trackedReserveETH":"0.000000003848391839686172562452299042268264"}

MongoClient.connect(url, function (err, db) {
	if (err) throw err;
	var dbo = db.db("BarterSwap");

	var whereStr = {};
	dbo.collection("QuickSwap").deleteMany(whereStr, function (err, obj) {
		if (err) throw err;
		console.log("quick 1",obj);
		db.close();
	});

	dbo.collection("QuickSwap").insertMany(pairs, function (err, res) {
		if (err) throw err;
		console.log("quick 2",res);
		db.close();
	});

	dbo.collection("QuickSwap").find({}).toArray(function (err, result) {
		if (err) throw err;
		console.log("quick 3",result);
		db.close();
	});
})

MongoClient.connect(url, function (err, db) {
	if (err) throw err;
	var dbo = db.db("BarterSwap");
	var whereStr = {};
	dbo.collection("SushiSwap").deleteMany(whereStr, function (err, obj) {
		if (err) throw err;
		console.log("Sushi 1",obj);
		db.close();
	});

	dbo.collection("SushiSwap").insertMany(pairs, function (err, res) {
		if (err) throw err;
		console.log("Sushi 2",res);
		db.close();
	});

	dbo.collection("SushiSwap").find({}).toArray(function (err, result) {
		if (err) throw err;
		console.log("Sushi 3",result);
		db.close();
	});
});