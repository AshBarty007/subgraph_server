
async function test(n:Number) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("n",n)
            resolve(n);
        }, 1000);
    })
}

async function start() {
    let fns = []
    let wait = []
    let index = 0
    for (let i = 0; i < 400; i++) {
        console.log("start",i)
        fns[index] = test(i)
        if (index>=4||i==39){
            console.log("index",index)
            wait.push(fns)
            fns = []
            index = index - 5
        }
        index ++
        console.log("end",i)
    }
    for(let i=0;i<wait.length;i++){
        await Promise.race(wait[i])
        let result = await Promise.all(wait[i]);
        console.log(i,result)
    }
}


async function run(){
    let result
    let ret = []
    for(let i = 0; i < 2; i++){
        // await Promise.race(data)
        result = await Promise.all([test(1),test(2),test(3)]);
        ret.push(...result)
    }
    console.log(result,ret)
}

run()