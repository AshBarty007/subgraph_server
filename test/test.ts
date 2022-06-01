
import curve from '@curvefi/api';

async function main() {
  await curve.init(
    'JsonRpc',
    {
      url: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      privateKey:
        'b87b1f26c7d0ffe0f65c25dbc09602e0ac9c0d14acc979b5d67439cade6cdb7b',
    },
    { chainId: 1 }
  );

  const tri = new curve.Pool('tricrypto2');
  const { route, output } = await curve.getBestRouteAndOutput(
    "0xdac17f958d2ee523a2206206994597c13d831ec7",
    //"0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    '40000'
  );
  console.log(route, output);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});