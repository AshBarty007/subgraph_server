import { GraphQLClient } from 'graphql-request';
import { default as retry } from 'async-retry';
import { SUBGRAPH_URL_BY_PANCAKESWAP,ChainId } from '../utils/url'
import { PancakeSwap_Subgraph } from '../utils/interfaces'
import { QueryPairsOfPancakeSwap } from '../utils/graphql'

export class PancakeSwap_Query{
    private PancakeSwap: GraphQLClient;
    
    constructor(    
        private chainId: ChainId,
        private retries = 5,     //The maximum amount of times to retry the operation.
        private maxTimeout = 10000,  //The maximum number of milliseconds between two retries.
    ){
        let subgraphUrl = SUBGRAPH_URL_BY_PANCAKESWAP[this.chainId]
        if (!subgraphUrl) {
            throw new Error(`No subgraph url for chain id: ${this.chainId}`);
          }
        this.PancakeSwap = new GraphQLClient(subgraphUrl);
    }   

    async retryQuery(): Promise<PancakeSwap_Subgraph[]>{
        let pairs: PancakeSwap_Subgraph[] = [];
        await retry(
            async () => {
                const poolsResult = await this.PancakeSwap.request<{
                    pairs: PancakeSwap_Subgraph[];
                }>(QueryPairsOfPancakeSwap);
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
