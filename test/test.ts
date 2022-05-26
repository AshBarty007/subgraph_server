let startTime = Date.now();
const timeout = (timeout: number, ret: number) => {
    return () =>
        new Promise((resolve) => {
            setTimeout(() => {
                const compare = Date.now() - startTime;
                console.log(`At ${Math.floor(compare / 100)}00 return`, ret);
                resolve(ret);
            }, timeout);
        });
};

const timeout1 = timeout(1000, 1);
const timeout2 = timeout(300, 2);
const timeout3 = timeout(400, 3);
const timeout4 = timeout(500, 4);
const timeout5 = timeout(200, 5);


const run0 = async () => {
    let result = await Promise.all([
        timeout1(),
        timeout2(),
        timeout3(),
        timeout4(),
        timeout5(),
    ]);
    console.log("run0 ", result)
};

class Concurrent1 {
    private maxConcurrent: number = 2;

    constructor(count: number = 2) {
        this.maxConcurrent = count;
    }
    public async useRace(fns: Function[]) {
        const runing: any[] = [];

        for (let i = 0; i < this.maxConcurrent; i++) {
            if (fns.length) {
                const fn = fns.shift()!;
                runing.push(fn(i));
            }
        }
        const handle = async () => {
            if (fns.length) {
                const idx = await Promise.race<number>(runing);
                const nextFn = fns.shift()!;

                runing.splice(idx, 1, nextFn(idx));
                handle();
            } else {

                return await Promise.all(runing);
            }
        };
        handle();
    }
}

const run1 = async () => {
    const concurrent = new Concurrent1();
    await concurrent.useRace([timeout1, timeout2, timeout3, timeout4, timeout5]);
};
class Concurrent2 {
    private maxConcurrent: number = 2;
    private list: Function[] = [];
    private currentCount: number = 0;
    private data: any[] = []
    private end = true

    constructor(count: number = 2) {
        this.maxConcurrent = count;
    }
    public async add(fn: Function) {
        this.end = false
        this.currentCount += 1;
        // 如果最大已经超过最大并发数
        if (this.currentCount > this.maxConcurrent) {
            // wait 是一个 Promise，只要调用 resolve 就会变成 fulfilled 状态
            const wait = new Promise((resolve) => {
                this.list.push(resolve);
            });
            // 在没有调用 resolve 的时候，这里会一直阻塞
            await wait;
        }
        // 执行函数
        let data = await fn();
        this.currentCount -= 1;
        if (this.list.length) {
            // 把 resolve 拿出来，调用，这样 wait 就完成了，可以往下面执行了
            const resolveHandler = this.list.shift()!;
            resolveHandler();
        }
        return data;
    }

    public async get() {
        if (this.end == true) {
            console.log("no data")
            return
        } else {
            return new Promise((resolve) => {
                if (this.currentCount == 0 && this.end == false) {
                    this.end = true
                    console.log("data1", this.data)
                    this.data = []
                    console.log("data2", this.data)
                    resolve(this.data)
                } else {
                    console.log("error", this.currentCount == 0, this.end == false)
                }
            })
        }
    }

    public isRun() {
        return this.end
    }
}

const run2 = async () => {
    const concurrent = new Concurrent2();
    concurrent.add(timeout1);
    concurrent.add(timeout2);
    concurrent.add(timeout3);
    concurrent.add(timeout4);
    concurrent.add(timeout5);
    let data = await concurrent.get();
    console.log("result", data)
};

//run0();
run1();
//run2();

// "connections" : {
//     "current" : NumberLong(334),
//     "available" : NumberLong(1366),
//     "totalCreated" : NumberLong(663)
// },