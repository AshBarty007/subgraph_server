import curve from "@curvefi/api";

(async () => {
    await curve.init('JsonRpc', {}, {gasPrice: 0, maxFeePerGas: 0, maxPriorityFeePerGas: 0});
    
    console.log(await curve.getTVL());
    // 19281307454.671753

    const aave = new curve.Pool('aave');

    console.log(await aave.stats.getParameters());
    // {
    //     virtualPrice: '1.082056814810440924',
    //     fee: '0.04',
    //     adminFee: '0.02',
    //     A: '2000',
    //     future_A: '2000',
    //     initial_A: '200',
    //     future_A_time: 1628525830000,
    //     initial_A_time: 1627923611000,
    //     gamma: undefined
    // }


    console.log(await aave.stats.getPoolBalances());
    // [ '19619514.600802512613372364', '18740372.790339', '16065974.167437' ]
    
    console.log(await aave.stats.getPoolWrappedBalances());
    // [ '19619514.600802512613372364', '18740372.790339', '16065974.167437' ]
    
    console.log(await aave.stats.getTotalLiquidity());
    // 54425861.55857851
    
    console.log(await aave.stats.getVolume());
    // 175647.68180084194
    
    console.log(await aave.stats.getBaseApy());
    // { day: '3.2015', week: '3.1185', month: '3.1318', total: '7.7286' }
    
    console.log(await aave.stats.getTokenApy());
    // [ '0.4093', '1.0233' ]

    console.log(await aave.stats.getRewardsApy());
    // [
    //     {
    //         token: '0x4da27a545c0c5B758a6BA100e3a049001de870f5',
    //         symbol: 'stkAAVE',
    //         apy: '0.4978306501849664'
    //     }
    // ]
})()
