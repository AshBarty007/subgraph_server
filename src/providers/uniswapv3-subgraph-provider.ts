import { GraphQLClient } from 'graphql-request';
import { default as retry } from 'async-retry';
import { ChainId } from './utils/ChainId'
import { SUBGRAPH_URL_BY_UNISWAP_V3 } from './utils/url'
import { ISubgraphProvider,RawETHV3SubgraphPool } from './utils/interfaces'
import { UniV3Gql,LiquidityMoreThan90Percent } from './utils/gql'

export class UniSwapV3SubgraphProvider implements ISubgraphProvider{
    private client: GraphQLClient;
    
    constructor(    
        private chainId: ChainId,
        private retries = 5,     //The maximum amount of times to retry the operation.
        private maxTimeout = 10000,  //The maximum number of milliseconds between two retries.
    ){
        let subgraphUrl = SUBGRAPH_URL_BY_UNISWAP_V3[this.chainId]
        if (!subgraphUrl) {
            throw new Error(`No subgraph url for chain id: ${this.chainId}`);
        }
        this.client = new GraphQLClient(subgraphUrl);
    }   

    async getPool(): Promise<RawETHV3SubgraphPool[]>{
        let pools: RawETHV3SubgraphPool[] = [];
        await retry(
            async () => {
                let gql = UniV3Gql(LiquidityMoreThan90Percent.UniSwap_V3)
                const poolsResult = await this.client.request<{
                    pools: RawETHV3SubgraphPool[];
                }>(gql);
                pools = pools.concat(poolsResult.pools);
            },      
            {
                retries: this.retries,       
                maxTimeout: this.maxTimeout,
                onRetry: (err, retry) => {
                    console.log("error message:",err,",retry times:",retry)
                },
            }
        );
        return pools;
    }
}