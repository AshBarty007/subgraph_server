import {BarterSwap_MongoDB} from '../src/mongodb/operator/client'

let dbClient = new BarterSwap_MongoDB("mongodb://127.0.0.1:27017","TestDB");
let Table = "Test"
let firstData = {'a':1}
let newData = {'b':2}
let filter = {}

dbClient.connectDB();

function test1(){
   dbClient.insertData(Table,firstData);
   let result1 = dbClient.findData(Table,firstData);
   console.log("1.",result1)
}

function test2(){
   dbClient.updateData(Table,firstData,newData);
   let result2 = dbClient.findData(Table,newData);
   console.log("2.",result2)

}
function test3(){
   dbClient.deleteData(Table,filter);
   let result3 = dbClient.findData(Table,filter);
   console.log("3.",result3)
}

test1()
test2()
test3()
