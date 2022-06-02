// const axios = require('axios');

// axios.get('https://api.curve.fi/api/getPools/ethereum/main')
//   .then((res:any) => {
//     console.log(res.data);
//     let sum = 0
//     for (let i=0;i<res.data.data.poolData.length;i++){
//         let balance = res.data.data.poolData[i].usdTotal
//         sum += balance
//         //console.log(res.data.data.poolData[i]);
//     }
//     console.log(sum,res.data.data.poolData.length)
//   })
//   .catch((err:any) => {
//     console.log(err);
//   });

import { BarterSwapDB, TableName } from '../src/mongodb/client'

let filter = {name:"curve"}
const DB = new BarterSwapDB();
DB.findData(TableName.SimplePools, filter).then((ret: any) => {
  let result = JSON.parse(ret)
  console.log(result)
})