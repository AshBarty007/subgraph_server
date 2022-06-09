import curve from "@curvefi/api";
const axios = require('axios');

(async () => {
    // axios.get('https://api.curve.fi/api/getTVLPolygon')
    //     .then((res: any) => {
    //         let tmp = JSON.stringify(res.data.data.pools)
    //         let ok = JSON.parse(tmp)
    //         let array = []
    //         let index = 0
    //         for (let key in ok) {
    //             array[index]= key; 
    //             index++;
    //         }
    //         console.log("array",array)
    //     })

    await curve.init(
        'JsonRpc',
        {
            url: 'https://polygon-mainnet.infura.io/v3/8cce6b470ad44fb5a3621aa34243647f',
            privateKey:
                'b87b1f26c7d0ffe0f65c25dbc09602e0ac9c0d14acc979b5d67439cade6cdb7b',
        },
        { chainId: 137 }
    );
    console.log(curve.getPoolList());
    console.log('=============================================')
    const aave = new curve.Pool('aave');
    console.log(aave.symbol)
    console.log(aave.coins)
    console.log(aave.coinAddresses)
    console.log(aave.decimals)
    console.log(aave.lpToken)
    console.log('=============================================')
    const ren = new curve.Pool('ren');
    console.log(ren.symbol)
    console.log(ren.coins)
    console.log(ren.coinAddresses)
    console.log(ren.decimals)
    console.log(ren.lpToken)
    // console.log('=============================================')
    // const atricrypto = new curve.Pool('atricrypto');
    // console.log(atricrypto.symbol)
    // console.log(atricrypto.coins)
    // console.log(atricrypto.coinAddresses)
    // console.log(atricrypto.decimals)
    // console.log(atricrypto.lpToken)
    console.log('=============================================')
    const atricrypto3 = new curve.Pool('atricrypto3');
    console.log(atricrypto3.symbol)
    console.log(atricrypto3.coins)
    console.log(atricrypto3.coinAddresses)
    console.log(atricrypto3.decimals)
    console.log(atricrypto3.lpToken)
    console.log('=============================================')
    const eurtusd = new curve.Pool('eurtusd');
    console.log(eurtusd.symbol)
    console.log(eurtusd.coins)
    console.log(eurtusd.coinAddresses)
    console.log(eurtusd.decimals)
    console.log(eurtusd.lpToken)
})()



