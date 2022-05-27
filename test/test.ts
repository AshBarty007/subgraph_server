import { default as retry } from 'async-retry';

async function Test() {
    await retry(
        async (bail, number) => {
            console.log("retry number", number)
            //bail(new Error('Unauthorized'));
            throw("test error")
        },
        { retries: 2, maxTimeout: 2000, onRetry: (err, retry) => { console.log("fail to get eth price, error message:", err, ",retry times:", retry) } }
    ).catch(() => {
        //Preventing abnormal exits
    })

    console.log("print me")
}
Test()