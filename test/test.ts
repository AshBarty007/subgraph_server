import { default as retry } from 'async-retry';
const schedule = require('node-schedule');

// setInterval(() => {
//     let time = new Date()
//     console.log('still running',time.toLocaleString);
// }, 2000);

async function Test() {
    await retry(
        async (bail, number) => {
            console.log("retry number", number)
            //bail(new Error('Unauthorized'));
            throw("test error")
        },
        { retries: 2, maxTimeout: 2000, onRetry: (err, retry) => { console.log("fail to get eth price, error message:", err, ",retry times:", retry) } }
    )
    .catch((err) => {
        console.log("retry catch",err)
        //Preventing abnormal exits
    })

    console.log("print me")
}
schedule.scheduleJob('1 * * * * *', () => {
    // try{
    //     Test()
    // }catch(err){
    //     console.log('catch err: ' + err);
    // }
    throw("test error")
})


process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

process.on('unhandledRejection', (err) => {
    console.log('unhandled exception', err);
})