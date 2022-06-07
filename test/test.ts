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

let data = {q:"w",e:[0,1,2,3,4]}
let copyArray = data.e

let copy = data

copy.e = [copyArray[0],copyArray[1]]
console.log("data1",data,copyArray )
console.log("copy1",copy)

let copy2 = data
copy.e = [copyArray[2],copyArray[3]]
console.log("data2",data,copyArray )
console.log("copy2",copy2)