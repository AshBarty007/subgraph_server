import { GraphQLClient } from 'graphql-request';
import { default as retry } from 'async-retry';
import { SUBGRAPH_URL_BY_UNISWAP_V3,ChainId } from '../utils/url'
import { UniSwapV3_Subgraph } from '../utils/interfaces'
import { QueryPairsOfUniSwapV3 } from '../utils/graphql'

export class UniSwapV3_Query{
    private UniSwapV3: GraphQLClient;
    
    constructor(    
        private chainId: ChainId,
        private retries = 5,     //The maximum amount of times to retry the operation.
        private maxTimeout = 10000,  //The maximum number of milliseconds between two retries.
    ){
        let subgraphUrl = SUBGRAPH_URL_BY_UNISWAP_V3[this.chainId]
        if (!subgraphUrl) {
            throw new Error(`No subgraph url for chain id: ${this.chainId}`);
        }
        this.UniSwapV3 = new GraphQLClient(subgraphUrl);
    }   

    async retryQuery(): Promise<UniSwapV3_Subgraph[]>{
        let pairs:   UniSwapV3_Subgraph[] = [];
        await retry(
            async () => {
                const poolsResult = await this.UniSwapV3.request<{
                    pools: UniSwapV3_Subgraph[];
                }>(QueryPairsOfUniSwapV3);
                pairs = pairs.concat(poolsResult.pools);
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