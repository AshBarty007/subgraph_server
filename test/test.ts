const axios = require('axios');

// https://api.curve.fi/api/getPools/polygon/main
// https://api.curve.fi/api/getPools/polygon/crypto
// https://api.curve.fi/api/getPools/polygon/factory
axios.get('https://api.curve.fi/api/getPools/polygon/main')
  .then((res:any) => {
    console.log(res.data);
    // let sum = 0
    // for (let i=0;i<res.data.data.poolData.length;i++){
    //     let balance = res.data.data.poolData[i].usdTotal
    //     sum += balance
    //     console.log(res.data.data.poolData[i]);
    // }
    // console.log(sum,res.data.data.poolData.length)
  })
  .catch((err:any) => {
    console.log(err);
  });