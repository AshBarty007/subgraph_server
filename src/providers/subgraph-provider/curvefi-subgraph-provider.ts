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
                        let ok = JSON.parse(JSON.stringify(res.data.data.pools))
                        let array = []
                        let index = 0
                        for (let key in ok) {
                            array[index]= ok[key]; 
                            index++;
                        }
                        let data = {
                            updateTime: Date.parse(new Date().toString()),
                            name: dexName.curve,
                            chainId: this.chainId,
                            result: array,
                        }
                        //console.log("data",data)
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

let ok = new CurveSubgraphProvider(ChainId.POLYGON)
ok.getPoolsByApi()

