import {BarterSwap_MongoDB} from '../src/mongodb/operator/client'

let dbClient = new BarterSwap_MongoDB("mongodb://127.0.0.1:27017","TestDB");
let Table = "Test"
let firstData = {'a':1}
let newData = {$set:{'b':2}}
let filter = {}

dbClient.connectDB();

async function test1(){
   await dbClient.insertData(Table,{'a':1});
   let result1 = await dbClient.findData(Table,filter);
   console.log("1.",result1)
   await dbClient.updateData(Table,{'a':1},{$set:{'b':2}});
   let result2 = await dbClient.findData(Table,filter);
   console.log("2.",result2)
   await dbClient.deleteData(Table,{'a':1});
   let result3 = await dbClient.findData(Table,filter);
   console.log("3.",result3)
}

async function test2(){
   await dbClient.updateData(Table,firstData,newData);
   let result2 = await dbClient.findData(Table,newData);
   console.log("2.",result2)

}
async function test3(){
   await dbClient.deleteData(Table,filter);
   let result3 = await dbClient.findData(Table,filter);
   console.log("3.",result3)
}

test1()
// test2()
// test3()
