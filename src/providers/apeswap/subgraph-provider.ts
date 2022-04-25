import { GraphQLClient } from 'graphql-request';
import { default as retry } from 'async-retry';
import { SUBGRAPH_URL_BY_APESWAP } from '../utils/url'
import { ApeSwap_Subgraph } from '../utils/interfaces'
import { QueryPairsOfApeSwap } from '../utils/graphql'

export default class ApeSwap_SubGraph{
    private ApeSwap: GraphQLClient;
    
    constructor(    
        private chainId: number,
        private retries: number,
        private maxTimeout = 10000,
    ){
        this.ApeSwap = new GraphQLClient(SUBGRAPH_URL_BY_APESWAP[this.chainId]);
    }   

    async query(): Promise<ApeSwap_Subgraph[]> {
        let pairs: ApeSwap_Subgraph[] = [];
        const poolsResult = await this.ApeSwap.request<{
            pairs: ApeSwap_Subgraph[];
        }>(QueryPairsOfApeSwap);
        pairs = pairs.concat(poolsResult.pairs);
        return pairs;
    }

    async retryQuery(){
        await retry(
            async () => {
                this.query().then((res:ApeSwap_Subgraph[]) => {
                   return res;
                }).catch(err => {
                    console.log(err);
                });
            },      
            {
                retries: this.retries,       //The maximum amount of times to retry the operation. Default is 10
                maxTimeout: this.maxTimeout, //The maximum number of milliseconds between two retries. Default is Infinity.
            }
        );
    }
}


