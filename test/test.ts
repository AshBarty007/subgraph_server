
async function test(n:Number) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(n);
        }, 1000);
    })
}

async function start() {
    let fns = []
    let wait = []
    let index = 0
    for (let i = 0; i < 40; i++) {
        fns[index] = test(i)
        if (index>=4||i==39){
            console.log("index",index)
            wait.push(fns)
            fns = []
            index = index - 5
        }
        index ++
    }
    for(let i=0;i<wait.length;i++){
        await Promise.race(wait[i])
        let result = await Promise.all(wait[i]);
        console.log(i,result)
    }
}
start()