import {MongoClient} from 'mongodb'
import {BarterSwap_MongoDB} from '../src/mongodb/client'

var data = {'name':'a','value':1}
var client = MongoClient.connect("mongodb://localhost:27017/")

// MongoClient.connect("mongodb://localhost:27017/TestDB", function(err, db) {
//     if (err) throw err;
//     console.log("database is ok");
//     db.close();
//   });

var a = new BarterSwap_MongoDB("mongodb://localhost:27017/","TestDB");
a.insertData("test1",data)