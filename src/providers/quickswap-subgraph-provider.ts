import { GraphQLClient } from 'graphql-request';
import { default as retry } from 'async-retry';
import { ChainId } from './utils/ChainId'
import { SUBGRAPH_URL_BY_QUICKSWAP } from './utils/url'
import { ISubgraphProvider,RawETHV2SubgraphPool } from './utils/interfaces'
import { UniV2Gql,LiquidityMoreThan90Percent } from './utils/gql'

export class QuickSwapSubgraphProvider implements ISubgraphProvider{
    private client: GraphQLClient;
    
    constructor(    
        private chainId: ChainId,
        private retries = 5,     //The maximum amount of times to retry the operation.
        private maxTimeout = 10000,  //The maximum number of milliseconds between two retries.
    ){
        let subgraphUrl = SUBGRAPH_URL_BY_QUICKSWAP[this.chainId]
        if (!subgraphUrl) {
            throw new Error(`No subgraph url for chain id: ${this.chainId}`);
          }
        this.client = new GraphQLClient(subgraphUrl);
    }   

    async getPool(): Promise<RawETHV2SubgraphPool[]>{
        let pairs: RawETHV2SubgraphPool[] = [];
        await retry(
            async () => {
                let gql = UniV2Gql(LiquidityMoreThan90Percent.QuickSwap,"trackedReserveETH")
                const poolsResult = await this.client.request<{
                    pairs: RawETHV2SubgraphPool[];
                }>(gql);
                pairs = pairs.concat(poolsResult.pairs);
            },      
            {
                retries: this.retries,       
                maxTimeout: this.maxTimeout,
                onRetry: (err, retry) => {
                    console.log("error message:",err,",retry times:",retry)
                },
            }
        );
        return pairs;
    }
}