import { GraphQLClient } from 'graphql-request';
import { default as retry } from 'async-retry';
import { SUBGRAPH_URL_BY_QUICKSWAP,ChainId } from '../utils/url'
import { QuickSwap_Subgraph } from '../utils/interfaces'
import { QueryPairsOfQuickSwap } from '../utils/graphql'

export class QuickSwap_Query{
    private QuickSwap: GraphQLClient;
    
    constructor(    
        private chainId: ChainId,
        private retries = 5,     //The maximum amount of times to retry the operation.
        private maxTimeout = 10000,  //The maximum number of milliseconds between two retries.
    ){
        let subgraphUrl = SUBGRAPH_URL_BY_QUICKSWAP[this.chainId]
        if (!subgraphUrl) {
            throw new Error(`No subgraph url for chain id: ${this.chainId}`);
          }
        this.QuickSwap = new GraphQLClient(subgraphUrl);
    }   

    async retryQuery(): Promise<QuickSwap_Subgraph[]>{
        let pairs: QuickSwap_Subgraph[] = [];
        await retry(
            async () => {
                const poolsResult = await this.QuickSwap.request<{
                    pairs: QuickSwap_Subgraph[];
                }>(QueryPairsOfQuickSwap);
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