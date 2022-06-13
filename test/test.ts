// const axios = require('axios');

// // https://api.curve.fi/api/getPools/polygon/main
// // https://api.curve.fi/api/getPools/polygon/crypto
// // https://api.curve.fi/api/getPools/polygon/factory

// axios.get('https://api.curve.fi/api/getPools/polygon/main')
//   .then((res:any) => {
//     console.log(res.data);
//     // let sum = 0
//     // for (let i=0;i<res.data.data.poolData.length;i++){
//     //     let balance = res.data.data.poolData[i].usdTotal
//     //     sum += balance
//     //     console.log(res.data.data.poolData[i]);
//     // }
//     // console.log(sum,res.data.data.poolData.length)
//   })
//   .catch((err:any) => {
//     console.log(err);
//   });
//   //https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-v2

  let arr = [0,1,2,3,4,5,6,7]
  let slice = arr.slice(2,4)
  console.log(slice)