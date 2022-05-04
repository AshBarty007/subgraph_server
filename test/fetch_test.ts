import {ApeSwapSubgraphProvider} from '../src/providers/apeswap-subgraph-provider'
import {PancakeSwapSubgraphProvider} from '../src/providers/pancakeswap-subgraph-provider'
import {QuickSwapSubgraphProvider} from '../src/providers/quickswap-subgraph-provider'
import {SushiSwapSubgraphProvider} from '../src/providers/sushiswap-subgraph-provider'
import {UniSwapV2SubgraphProvider} from '../src/providers/uniswapv2-subgraph-provider'
import {UniSwapV3SubgraphProvider} from '../src/providers/uniswapv3-subgraph-provider'

var a = new ApeSwapSubgraphProvider(56);
var b = new PancakeSwapSubgraphProvider(56);
var c = new QuickSwapSubgraphProvider(137);
var d = new SushiSwapSubgraphProvider(137);
var e = new UniSwapV2SubgraphProvider(1);
var f = new UniSwapV3SubgraphProvider(137);


a.getPool().then((r)=>{console.log(r.length)})
b.getPool().then((r)=>{console.log(r.length)})
c.getPool().then((r)=>{console.log(r.length)})
d.getPool().then((r)=>{console.log(r.length)})
e.getPool().then((r)=>{console.log(r.length)})
f.getPool().then((r)=>{console.log(r.length)})
