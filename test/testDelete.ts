import {queryUniSwapV2OnChain} from '../src/providers/onchain-provider/uniswapv2-onchain'
import { ChainId } from '../src/providers/utils/chainId';

class Concurrent {
    private maxConcurrent: number = 2;
    private list: Function[] = [];
    private currentCount: number = 0;
  
    constructor(count: number = 2) {
      this.maxConcurrent = count;
    }
    public async add(fn: Function, chainId: ChainId, id: string, token0: string, token1: string, price: number) {
      this.currentCount += 1;
      if (this.currentCount > this.maxConcurrent) {
        const wait = new Promise((resolve) => {
          this.list.push(resolve);
        });
        await wait;
      }
      await fn(chainId,id,token0,token1,price);
      this.currentCount -= 1;
      if (this.list.length) {
        const resolveHandler = this.list.shift()!;
        resolveHandler();
      }
      console.log("pass")
    }
  }



const run = async () => {
    const concurrent = new Concurrent(5);
    concurrent.add(queryUniSwapV2OnChain,ChainId.MAINNET,"","0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",2000);
    concurrent.add(queryUniSwapV2OnChain,ChainId.MAINNET,"","0x66a0f676479cee1d7373f3dc2e2952778bff5bd6","0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",2000);
    concurrent.add(queryUniSwapV2OnChain,ChainId.MAINNET,"","0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",2000);
    concurrent.add(queryUniSwapV2OnChain,ChainId.MAINNET,"","0x66a0f676479cee1d7373f3dc2e2952778bff5bd6","0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",2000);
    concurrent.add(queryUniSwapV2OnChain,ChainId.MAINNET,"","0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",2000);
    concurrent.add(queryUniSwapV2OnChain,ChainId.MAINNET,"","0x66a0f676479cee1d7373f3dc2e2952778bff5bd6","0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",2000);
    concurrent.add(queryUniSwapV2OnChain,ChainId.MAINNET,"","0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",2000);
    concurrent.add(queryUniSwapV2OnChain,ChainId.MAINNET,"","0x66a0f676479cee1d7373f3dc2e2952778bff5bd6","0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",2000);
    concurrent.add(queryUniSwapV2OnChain,ChainId.MAINNET,"","0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",2000);
    concurrent.add(queryUniSwapV2OnChain,ChainId.MAINNET,"","0x66a0f676479cee1d7373f3dc2e2952778bff5bd6","0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",2000);

  };
  
  run();