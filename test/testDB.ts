import {BarterSwapDB} from '../src/mongodb/client'

async function test(){
   let DB = new BarterSwapDB()
   await DB.insertData("TestTable",{name:"first",value:"1"}).catch((err)=>{console.log("insert err",err)})
   await DB.findData("TestTable",{name:"first"}).then((data)=>{console.log("1.data",data)})
   await DB.updateData("TestTable",{name:"first"},{name:"first",value:"1",append:"2"}).catch((err)=>{console.log("update err",err)})
   await DB.findData("TestTable",{name:"first"}).then((data)=>{console.log("2.data",data)})
   await DB.deleteData("TestTable",{name:"first"}).catch((err)=>{console.log("delete err",err)})
   await DB.findData("TestTable",{name:"first"}).then((data)=>{console.log("3.data",data)})
   return
}

test()