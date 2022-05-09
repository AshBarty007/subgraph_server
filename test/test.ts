import {queryV2PoolGQL,quickQueryV2PoolGQL} from '../src/providers/utils/gql'

console.log(quickQueryV2PoolGQL(10,'ETH'))
console.log(queryV2PoolGQL(10,'ETH'))