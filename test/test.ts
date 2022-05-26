
async function test(n:Number) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("First");
            resolve(n);
        }, 1000);
    })
}

async function start() {
    let fns = []
    for (let i = 0; i < 10; i++) {
        fns[i] = test(i)
    }
    await Promise.race(fns)
    let result = await Promise.all(fns);
    console.log(result)
}
start()