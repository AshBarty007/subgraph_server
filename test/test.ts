// let data = [{"_id":"62835ab54e0ab440b3c9bb60","updateTime":1652775605000,"name":"pancakeswap","chainId":56,"result":{"pairs":[{"id":"0x7efaef62fddcca950418312c6c91aef321375a00","token0":{"id":"0x55d398326f99059ff775485246999027b3197955","symbol":"USDT"},"token1":{"id":"0xe9e7cea3dedca5984780bafc599bd69add087d56","symbol":"BUSD"}},{"id":"0x58f876857a02d6762e0101bb5c46a8c1ed44dc16","token0":{"id":"0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c","symbol":"WBNB"},"token1":{"id":"0xe9e7cea3dedca5984780bafc599bd69add087d56","symbol":"BUSD"}},{"id":"0x16b9a82891338f9ba80e2d6970fdda79d1eb0dae","token0":{"id":"0x55d398326f99059ff775485246999027b3197955","symbol":"USDT"},"token1":{"id":"0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c","symbol":"WBNB"}},{"id":"0x2354ef4df11afacb85a5c7f98b624072eccddbb1","token0":{"id":"0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d","symbol":"USDC"},"token1":{"id":"0xe9e7cea3dedca5984780bafc599bd69add087d56","symbol":"BUSD"}},{"id":"0x0ed7e52944161450477ee417de9cd3a859b14fd0","token0":{"id":"0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82","symbol":"Cake"},"token1":{"id":"0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c","symbol":"WBNB"}},{"id":"0xec6557348085aa57c72514d67070dc863c0a5a8c","token0":{"id":"0x55d398326f99059ff775485246999027b3197955","symbol":"USDT"},"token1":{"id":"0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d","symbol":"USDC"}},{"id":"0x74e4716e431f45807dcf19f284c7aa99f18a4fbc","token0":{"id":"0x2170ed0880ac9a755fd29b2688956bd959f933f8","symbol":"ETH"},"token1":{"id":"0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c","symbol":"WBNB"}},{"id":"0x61eb789d75a95caa3ff50ed7e47b96c132fec082","token0":{"id":"0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c","symbol":"BTCB"},"token1":{"id":"0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c","symbol":"WBNB"}},{"id":"0xd171b26e4484402de70e3ea256be5a2630d7e88d","token0":{"id":"0x2170ed0880ac9a755fd29b2688956bd959f933f8","symbol":"ETH"},"token1":{"id":"0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c","symbol":"BTCB"}},{"id":"0xf45cd219aef8618a92baa7ad848364a158a24f33","token0":{"id":"0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c","symbol":"BTCB"},"token1":{"id":"0xe9e7cea3dedca5984780bafc599bd69add087d56","symbol":"BUSD"}}]}}]
// let len = data[0].result.pairs.length
// for(let i=0;i<len;i++){
//     console.log(i)
//     console.log(data[0].result.pairs[i].token0.id)
//     console.log(data[0].result.pairs[i].token1.id)
// }
var a = {d: 2};
var b = {a: 2, b: 3, c: 4};

function extend(target:any, source:any) {
    for (var obj in source) {
        target[obj] = source[obj];
    }
    return target;
}

var c = extend(a, b);
console.log(c);