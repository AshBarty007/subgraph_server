import {BarterSwapDB} from '../src/mongodb/client'

async function test(){
   let DB = new BarterSwapDB()
   await DB.insertData("TestTable",{name:"first",value:"1"})
   await DB.findData("TestTable",{name:"first"}).then((data)=>{console.log("data1",data)})
   await DB.updateData("TestTable",{name:"first"},{append:"2"})
   await DB.findData("TestTable",{name:"first"}).then((data)=>{console.log("data2",data)})
   await DB.deleteData("TestTable",{name:"first"})
   await DB.findData("TestTable",{name:"first"}).then((data)=>{console.log("data3",data)})
   return
}

test()