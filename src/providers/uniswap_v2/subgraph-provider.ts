import { GraphQLClient } from 'graphql-request';
import { default as retry } from 'async-retry';
import { SUBGRAPH_URL_BY_UNISWAP_V2,ChainId } from '../utils/url'
import { UniSwapV2_Subgraph } from '../utils/interfaces'
import { QueryPairsOfUniSwapV2 } from '../utils/graphql'

export class UniSwapV2_Query{
    private UniSwapV2: GraphQLClient;
    
    constructor(    
        private chainId: ChainId,
        private retries = 5,     //The maximum amount of times to retry the operation.
        private maxTimeout = 10000,  //The maximum number of milliseconds between two retries.
    ){
        let subgraphUrl = SUBGRAPH_URL_BY_UNISWAP_V2[this.chainId]
        if (!subgraphUrl) {
            throw new Error(`No subgraph url for chain id: ${this.chainId}`);
          }
        this.UniSwapV2 = new GraphQLClient(subgraphUrl);
    }   

    async retryQuery(): Promise<UniSwapV2_Subgraph[]>{
        let pairs: UniSwapV2_Subgraph[] = [];
        await retry(
            async () => {
                const poolsResult = await this.UniSwapV2.request<{
                    pairs: UniSwapV2_Subgraph[];
                }>(QueryPairsOfUniSwapV2);
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