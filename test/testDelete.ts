let startTime = Date.now();
const timeout = (timeout: number, ret: number) => {
    return (idx?: any) =>
        new Promise((resolve) => {
            setTimeout(() => {
                const compare = Date.now() - startTime;
                console.log(`At ${Math.floor(compare / 100)}00 return`, ret);
                resolve(idx);
            }, timeout);
        });
};

const timeout1 = timeout(500, 1);
const timeout2 = timeout(400, 2);
const timeout3 = timeout(300, 3);
const timeout4 = timeout(200, 4);
const timeout5 = timeout(100, 5);

class Concurrent {
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
                await Promise.all(runing);
            }
        };
        handle();
    }
}

const run = async () => {
    const concurrent = new Concurrent();
    startTime = Date.now();
    await concurrent.useRace([timeout1, timeout2, timeout3, timeout4, timeout5]);
};


run();