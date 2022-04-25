var retry = require('retry')
var graphql = require('../src/graphql')


function retryGet() {
    var options = {
        retries: 5,
        maxTimeout:2000
    }
    var operation = retry.operation(options);
    operation.attempt(function (currentAttempt) {
        console.log("Connect Times:" + currentAttempt);
        graphql.query2(graphql.PancakeSwap, 10).then(res => {
            console.log(res);
        }).catch(err => {
            if (operation.retry(err)) {
                console.log(Dete(),"err1:",err);
                return;
            }
            //cb(err ? operation.mainError() : null);
            console.log("err2:",err) 
        });
    });
}
retryGet();

// const pause = (duration) => new Promise((reslove) => setTimeout(reslove, duration));

// const backoff = (retries, fn, delay = 500) => {
//   fn().catch((err) => retries>1
//     ? pause(delay).then(() => backoff(retries-1, fn, delay))
//     : Promise.reject(err)
//   );
// }