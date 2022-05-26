
async function test() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("First");
            resolve(1);
        }, 1000);
    })
    // .then(()=> {
    //     return new Promise(function (resolve, reject) {
    //         setTimeout(function () {
    //             console.log("Second");
    //             resolve(2);
    //         }, 4000);
    //     });
    // })
    // .then(()=> {
    //     setTimeout(function () {
    //         console.log("Third");
    //     }, 3000);
    // });
}

async function start() {
    for (let i = 0; i < 5; i++) {
        console.log("start")
        await test()
    }
}
start()