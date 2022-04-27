import {ApeSwap_Query} from "../src/providers/apeswap/subgraph-provider"
import {UniSwapV2_Query} from "../src/providers/uniswap_v2/subgraph-provider"
import {UniSwapV3_Query} from "../src/providers/uniswap_v3/subgraph-provider"
import {PancakeSwap_Query} from "../src/providers/pancakeswap/subgraph-provider"
import {QuickSwap_Query} from "../src/providers/quickswap/subgraph-provider"
import {SushiSwap_Query} from "../src/providers/sushiswap/subgraph-provider"
import {ChainId} from "../src/providers/utils/url"

let a = new ApeSwap_Query(ChainId.BSC);
let b = new UniSwapV2_Query(ChainId.MAINNET);
let c = new UniSwapV3_Query(ChainId.POLYGON);
let d = new PancakeSwap_Query(ChainId.BSC);
let e = new QuickSwap_Query(ChainId.POLYGON);
let f = new SushiSwap_Query(ChainId.POLYGON);

async function TestQuery() {
   await c.retryQuery()
   console.log("end")
}

TestQuery()