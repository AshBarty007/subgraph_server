import { GraphQLClient } from 'graphql-request';
import { default as retry } from 'async-retry';
import { SUBGRAPH_URL_BY_APESWAP,ChainId } from '../utils/url'
import { ApeSwap_Subgraph } from '../utils/interfaces'
import { QueryPairsOfApeSwap } from '../utils/graphql'

export class ApeSwap_Query{
    private ApeSwap: GraphQLClient;
    
    constructor(    
        private chainId: ChainId,
        private retries = 5,     //The maximum amount of times to retry the operation.
        private maxTimeout = 10000,  //The maximum number of milliseconds between two retries.
    ){
        let subgraphUrl = SUBGRAPH_URL_BY_APESWAP[this.chainId]
        if (!subgraphUrl) {
            throw new Error(`No subgraph url for chain id: ${this.chainId}`);
          }
        this.ApeSwap = new GraphQLClient(subgraphUrl);
    }   

    async retryQuery(): Promise<ApeSwap_Subgraph[]>{
        let pairs: ApeSwap_Subgraph[] = [];
        await retry(
            async () => {
                const poolsResult = await this.ApeSwap.request<{
                    pairs: ApeSwap_Subgraph[];
                }>(QueryPairsOfApeSwap);
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
