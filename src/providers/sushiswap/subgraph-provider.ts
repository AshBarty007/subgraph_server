import { GraphQLClient } from 'graphql-request';
import { default as retry } from 'async-retry';
import { SUBGRAPH_URL_BY_SUSHISWAP,ChainId } from '../utils/url'
import { SushiSwap_Subgraph } from '../utils/interfaces'
import { QueryPairsOfSushiSwap } from '../utils/graphql'

export class SushiSwap_Query{
    private SushiSwap: GraphQLClient;
    
    constructor(    
        private chainId: ChainId,
        private retries = 5,     //The maximum amount of times to retry the operation.
        private maxTimeout = 10000,  //The maximum number of milliseconds between two retries.
    ){
        let subgraphUrl = SUBGRAPH_URL_BY_SUSHISWAP[this.chainId]
        if (!subgraphUrl) {
            throw new Error(`No subgraph url for chain id: ${this.chainId}`);
          }
        this.SushiSwap = new GraphQLClient(subgraphUrl);
    }   

    async retryQuery(): Promise<SushiSwap_Subgraph[]>{
        let pairs: SushiSwap_Subgraph[] = [];
        await retry(
            async () => {
                const poolsResult = await this.SushiSwap.request<{
                    pairs: SushiSwap_Subgraph[];
                }>(QueryPairsOfSushiSwap);
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