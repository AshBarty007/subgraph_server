import { GraphQLClient } from 'graphql-request';
import { default as retry } from 'async-retry';
import { ChainId } from './utils/chainId'
import { SUBGRAPH_URL_BY_SUSHISWAP } from './utils/url'
import { ISubgraphProvider,RawETHV2SubgraphPool } from './utils/interfaces'
import { LiquidityMoreThan90Percent, queryV2PoolGQL,quickQueryV2PoolGQL } from './utils/gql'
import { BarterSwapDB,TableName } from '../mongodb/client'


export class SushiSwapSubgraphProvider implements ISubgraphProvider{
    private client: GraphQLClient;
    private DB = new BarterSwapDB();

    constructor(    
        private chainId: ChainId,
        private retries = 2,     //The maximum amount of times to retry the operation.
        private maxTimeout = 5000,  //The maximum number of milliseconds between two retries.
    ){
        let subgraphUrl = SUBGRAPH_URL_BY_SUSHISWAP[this.chainId]
        if (!subgraphUrl) {
            throw new Error(`No subgraph url for chain id: ${this.chainId}`);
          }
        this.client = new GraphQLClient(subgraphUrl);
    }   

    async getPools(){
        await retry(
            async () => {
                await this.client.request<{
                    pairs: RawETHV2SubgraphPool[];
                }>(queryV2PoolGQL(LiquidityMoreThan90Percent.SushiSwap,'ETH')).then((res)=>{
                    let data = {
                        updateTime: Date.parse(new Date().toString()),
                        name: "SushiSwap",
                        chainId :this.chainId,
                        result : res,
                    }
                    this.DB.insertData(TableName.DetailedPools,data)
                });
            },      
            {
                retries: this.retries,       
                maxTimeout: this.maxTimeout,
                onRetry: (err, retry) => {
                    console.log("error message:",err,",retry times:",retry)
                },
            }
        );

    }

    async quickGetPools(){
        await retry(
            async () => {
                await this.client.request<{
                    pairs: RawETHV2SubgraphPool[];
                }>(quickQueryV2PoolGQL(LiquidityMoreThan90Percent.SushiSwap,'ETH')).then((res)=>{
                    let data = {
                        updateTime: Date.parse(new Date().toString()),
                        name: "SushiSwap",
                        chainId :this.chainId,
                        result : res,
                    }
                    this.DB.insertData(TableName.SimplePools,data)
                });
            },      
            {
                retries: this.retries,       
                maxTimeout: this.maxTimeout,
                onRetry: (err, retry) => {
                    console.log("error message:",err,",retry times:",retry)
                },
            }
        );
    }
}