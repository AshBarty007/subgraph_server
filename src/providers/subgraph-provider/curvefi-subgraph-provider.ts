import { GraphQLClient } from 'graphql-request';
import { default as retry } from 'async-retry';
import { ChainId } from '../utils/chainId'
import { dexName } from '../utils/params'
import { SUBGRAPH_URL_BY_CURVE,API_URL_BY_CURVE } from '../utils/url'
import { ISubgraphProvider, RawCurveSubgraphPool } from '../utils/interfaces'
import { LiquidityMoreThan90Percent, queryCurvePoolGQL, quickQueryCurvePoolGQL } from '../utils/gql'
import { BarterSwapDB, TableName } from '../../mongodb/client'

const axios = require('axios');

export class CurveSubgraphProvider implements ISubgraphProvider {
    private client: GraphQLClient;
    private DB = new BarterSwapDB();

    constructor(
        private chainId: ChainId,
        private retries = 2,     //The maximum amount of times to retry the operation.
        private maxTimeout = 5000,  //The maximum number of milliseconds between two retries.
    ) {
        let subgraphUrl = SUBGRAPH_URL_BY_CURVE[this.chainId]
        if (!subgraphUrl) {
            throw new Error(`No subgraph url for chain id: ${this.chainId}`);
        }
        this.client = new GraphQLClient(subgraphUrl);
    }

    async getPools() {
        await retry(
            async () => {
                await this.client.request<{
                    pools: RawCurveSubgraphPool[];
                }>(queryCurvePoolGQL(LiquidityMoreThan90Percent.Curve)).then((res) => {
                    let data = {
                        updateTime: Date.parse(new Date().toString()),
                        name: dexName.curve,
                        chainId: this.chainId,
                        result: res,
                    }
                    this.DB.deleteData(TableName.DetailedPools, { name: dexName.curve }, true).then(() => { this.DB.insertData(TableName.DetailedPools, data) }).catch(() => { console.log("fail to delete data,table name", TableName.DetailedPools) })
                });
            },
            {
                retries: this.retries,
                maxTimeout: this.maxTimeout,
                onRetry: (err, retry) => {
                    console.log("error message:", err, ",retry times:", retry)
                },
            }
        );

    }

    async quickGetPools() {
        await retry(
            async () => {
                await this.client.request<{
                    pools: RawCurveSubgraphPool[];
                }>(quickQueryCurvePoolGQL(LiquidityMoreThan90Percent.Curve)).then((res) => {
                    let data = {
                        updateTime: Date.parse(new Date().toString()),
                        name: dexName.curve,
                        chainId: this.chainId,
                        result: res,
                    }
                    //this.DB.deleteData(TableName.SimplePools, { name: dexName.curve }, true).then(() => { this.DB.insertData(TableName.SimplePools, data) }).catch(() => { console.log("fail to delete data,table name", TableName.SimplePools) })
                });
            },
            {
                retries: this.retries,
                maxTimeout: this.maxTimeout,
                onRetry: (err, retry) => {
                    console.log("error message:", err, ",retry times:", retry)
                },
            }
        );
    }

    async getPoolsByApi() {
        await retry(
            async () => {
                axios.get(API_URL_BY_CURVE[this.chainId])
                    .then((res: any) => {
                        console.log("pools",res.data.data.poolData)
                        let tmp = JSON.stringify(res.data.data.poolData)
                        let ok = JSON.parse(tmp)
                        let array = []
                        let index = 0
                        for (let key in ok) {
                            // console.log("index",index)
                            // console.log("coin",ok[key].coins.length)
                            if (ok[key].coins.length == 4){
                                array[index]= ok[key]; 
                            }else if (ok[key].coins.length == 3){
                                let copy1 = ok[key]
                                copy1.coinsAddresses = [ok[key].coinsAddresses[0],ok[key].coinsAddresses[1]]
                                copy1.decimals = [ok[key].decimals[0],ok[key].decimals[1]]
                                copy1.underlyingDecimals = [ok[key].underlyingDecimals[0],ok[key].underlyingDecimals[1]]
                                copy1.coins = [ok[key].coins[0],ok[key].coins[1]]
                                array[index] = copy1 
                                index++

                                let copy2 = ok[key]
                                copy2.coinsAddresses = [ok[key].coinsAddresses[0],ok[key].coinsAddresses[2]]
                                copy2.decimals = [ok[key].decimals[0],ok[key].decimals[2]]
                                copy2.underlyingDecimals = [ok[key].underlyingDecimals[0],ok[key].underlyingDecimals[2]]
                                copy2.coins = [ok[key].coins[0],ok[key].coins[2]]
                                array[index] = copy2 
                                index++

                                let copy3 = ok[key]
                                copy3.coinsAddresses = [ok[key].coinsAddresses[1],ok[key].coinsAddresses[2]]
                                copy3.decimals = [ok[key].decimals[1],ok[key].decimals[2]]
                                copy3.underlyingDecimals = [ok[key].underlyingDecimals[1],ok[key].underlyingDecimals[2]]
                                copy3.coins = [ok[key].coins[1],ok[key].coins[2]]
                                array[index] = copy3 
                                index++
                            }else if (ok[key].coins.length == 2){
                                let copy1 = ok[key]
                                copy1.coinsAddresses = [ok[key].coinsAddresses[0],ok[key].coinsAddresses[1]]
                                copy1.decimals = [ok[key].decimals[0],ok[key].decimals[1]]
                                copy1.underlyingDecimals = [ok[key].underlyingDecimals[0],ok[key].underlyingDecimals[1]]
                                copy1.coins = [ok[key].coins[0],ok[key].coins[1]]
                                array[index] = copy1 
                                index++

                                let copy2 = ok[key]
                                copy2.coinsAddresses = [ok[key].coinsAddresses[0],ok[key].coinsAddresses[2]]
                                copy2.decimals = [ok[key].decimals[0],ok[key].decimals[2]]
                                copy2.underlyingDecimals = [ok[key].underlyingDecimals[0],ok[key].underlyingDecimals[2]]
                                copy2.coins = [ok[key].coins[0],ok[key].coins[2]]
                                array[index] = copy2 
                                index++

                                let copy3 = ok[key]
                                copy3.coinsAddresses = [ok[key].coinsAddresses[1],ok[key].coinsAddresses[2]]
                                copy3.decimals = [ok[key].decimals[1],ok[key].decimals[2]]
                                copy3.underlyingDecimals = [ok[key].underlyingDecimals[1],ok[key].underlyingDecimals[2]]
                                copy3.coins = [ok[key].coins[1],ok[key].coins[2]]
                                array[index] = copy3 
                                index++

                                let copy4 = ok[key]
                                copy4.coinsAddresses = [ok[key].coinsAddresses[0],ok[key].coinsAddresses[3]]
                                copy4.decimals = [ok[key].decimals[0],ok[key].decimals[3]]
                                copy4.underlyingDecimals = [ok[key].underlyingDecimals[0],ok[key].underlyingDecimals[3]]
                                copy4.coins = [ok[key].coins[0],ok[key].coins[3]]
                                array[index] = copy4 
                                index++

                                let copy5 = ok[key]
                                copy5.coinsAddresses = [ok[key].coinsAddresses[1],ok[key].coinsAddresses[3]]
                                copy5.decimals = [ok[key].decimals[1],ok[key].decimals[3]]
                                copy5.underlyingDecimals = [ok[key].underlyingDecimals[1],ok[key].underlyingDecimals[3]]
                                copy5.coins = [ok[key].coins[1],ok[key].coins[3]]
                                array[index] = copy5 
                                index++

                                let copy6 = ok[key]
                                copy6.coinsAddresses = [ok[key].coinsAddresses[2],ok[key].coinsAddresses[3]]
                                copy6.decimals = [ok[key].decimals[2],ok[key].decimals[3]]
                                copy6.underlyingDecimals = [ok[key].underlyingDecimals[2],ok[key].underlyingDecimals[3]]
                                copy6.coins = [ok[key].coins[2],ok[key].coins[3]]
                                array[index] = copy6 
                                index++
                            }
                        }
                        let data = {
                            updateTime: Date.parse(new Date().toString()),
                            name: dexName.curve,
                            chainId: this.chainId,
                            result: array,
                        }
                        //console.log(data.result,data.result.length)
                        this.DB.deleteData(TableName.SimplePools, { name: dexName.curve }, true).then(() => { this.DB.insertData(TableName.SimplePools, data) }).catch(() => { console.log("fail to delete data,table name", TableName.SimplePools) })
                    }).catch((err:any)=>{ console.log("cannot get data from api,err:",err) })
            },
            {
                retries: this.retries,
                maxTimeout: this.maxTimeout,
                onRetry: (err, retry) => {
                    console.log("error message:", err, ",retry times:", retry)
                },
            }
        );
    }

}

let ok = new CurveSubgraphProvider(ChainId.MAINNET)
ok.getPoolsByApi()

//aave
//ren
//atricrypto
//atricrypto3
//eurtusd