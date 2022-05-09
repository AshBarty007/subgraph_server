import { GraphQLClient } from 'graphql-request';
import { default as retry } from 'async-retry';
import { ChainId } from './utils/ChainId'
import { SUBGRAPH_URL_BY_UNISWAP_V3 } from './utils/url'
import { ISubgraphProvider,RawETHV3SubgraphPool } from './utils/interfaces'
import { LiquidityMoreThan90Percent, queryV3PoolGQL,quickQueryV3PoolGQL } from './utils/gql'
import { BarterSwapDB,TableName } from '../mongodb/client'

export class UniSwapV3SubgraphProvider implements ISubgraphProvider{
    private client: GraphQLClient;
    private DB: BarterSwapDB;

    constructor(    
        private chainId: ChainId,
        private retries = 2,     //The maximum amount of times to retry the operation.
        private maxTimeout = 5000,  //The maximum number of milliseconds between two retries.
    ){
        let subgraphUrl = SUBGRAPH_URL_BY_UNISWAP_V3[this.chainId]
        if (!subgraphUrl) {
            throw new Error(`No subgraph url for chain id: ${this.chainId}`);
        }
        this.client = new GraphQLClient(subgraphUrl);
    }   

    async getPools(){
        await retry(
            async () => {
                await this.client.request<{
                    pairs: RawETHV3SubgraphPool[];
                }>(queryV3PoolGQL(LiquidityMoreThan90Percent.UniSwap_V3)).then((res)=>{
                    let data = {
                        updateTime: Date.parse(new Date().toString()),
                        name: "UniswapV3Swap",
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
                    pairs: RawETHV3SubgraphPool[];
                }>(quickQueryV3PoolGQL(LiquidityMoreThan90Percent.UniSwap_V3)).then((res)=>{
                    let data = {
                        updateTime: Date.parse(new Date().toString()),
                        name: "UniswapV3Swap",
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