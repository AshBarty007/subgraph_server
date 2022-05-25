import { queryUniSwapV2OnChain } from '../src/providers/onchain-provider/uniswapv2-onchain'
import { ChainId } from '../src/providers/utils/chainId';

class Concurrent {
  private maxConcurrent: number = 2;
  private list: Function[] = [];
  private currentCount: number = 0;

  constructor(count: number = 2) {
    this.maxConcurrent = count;
  }
  public async add(fn: Function, chainId: ChainId, id: string, token0: string, token1: string, price: number,i:Number) {
    this.currentCount += 1;
    if (this.currentCount > this.maxConcurrent) {
      const wait = new Promise((resolve) => {
        this.list.push(resolve);
      });
      await wait;
    }
    let ok = await fn(chainId, id, token0, token1, price);
    this.currentCount -= 1;
    if (this.list.length) {
      const resolveHandler = this.list.shift()!;
      resolveHandler();
    }
    let end = new Date().toLocaleString()
    console.log(i,end,ok)
    return ok
  }
}



const run = async () => {
  const concurrent = new Concurrent(100);
  let start = new Date().toLocaleString()
  console.log("start", start)
  for (let i = 0; i < 1000; i++) {
    let ok = concurrent.add(queryUniSwapV2OnChain, ChainId.MAINNET, "", "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", 2000,i);
    //concurrent.add(queryUniSwapV2OnChain, ChainId.MAINNET, "", "0x66a0f676479cee1d7373f3dc2e2952778bff5bd6", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", 2000,i);
    //console.log(ok)
  }
};

run();

// class Concurrent {
//   private maxConcurrent: number = 2;

//   constructor(count: number = 2) {
//     this.maxConcurrent = count;
//   }
//   public async useRace(fns: Function[]) {
//     const runing: any[] = [];
//     for (let i = 0; i < this.maxConcurrent; i++) {
//       if (fns.length) {
//         const fn = fns.shift()!;
//         runing.push(fn(i));
//       }
//     }
//     const handle = async () => {
//       if (fns.length) {
//         const idx = await Promise.race<number>(runing);
//         const nextFn = fns.shift()!;
//         runing.splice(idx, 1, nextFn(idx));
//         handle();
//       } else {
//         await Promise.all(runing);
//       }
//     };
//     handle();
//   }
// }

// const run = async () => {
//   const concurrent = new Concurrent();
//   await concurrent.useRace([]);
// };
