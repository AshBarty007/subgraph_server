import { BarterSwapDB, TableName } from '../mongodb/client'
import { Injectable, Query } from '@nestjs/common';
import { dexName } from '../providers/utils/params';

@Injectable()
export class AppService {
  private DB = new BarterSwapDB();

  async getPools(dex: any):Promise<void> {
    let pools = {
      pancakeswap: String,
      quickswap: String,
      sushiswap: String,
      uniswap_v2: String,
      uniswap_v3: String,
      curve: String,
      balancer: String
    }

    let filter = {
      name: { "$in": dex },
    }
console.log('filter',filter)
    await this.DB.findData(TableName.SimplePools, filter).then((ret: any) => {
      let result = JSON.parse(ret)
      for (let i = 0; i < dex.length; i++) {
        try {
          switch (result[i].name) {
            case dexName.uniswap_v3:
              console.log(i, result[i].name)
              pools.uniswap_v3 = result[i].result.pools;
              break;
            case dexName.uniswap_v2:
              console.log(i, result[i].name)
              pools.uniswap_v2 = result[i].result.pairs;
              break;
            case dexName.sushiswap:
              console.log(i, result[i].name)
              pools.sushiswap = result[i].result.pairs;
              break;
            case dexName.quickswap:
              console.log(i, result[i].name)
              pools.quickswap = result[i].result.pairs;
              break;
            case dexName.pancakeswap:
              console.log(i, result[i].name)
              pools.pancakeswap = result[i].result.pairs;
              break;
            case dexName.curve:
              console.log(i, result[i].name)
              pools.curve = result[i].result;
              break;
            case dexName.balancer:
              console.log(i, result[i].name)
              pools.balancer = result[i].result;
              break;
          }

          return JSON.stringify(pools)
        } catch (err) {
          console.log("error by returning db data,", err);
          return 'fail to fetch data, err' + err;
        }
      }
      return pools;
    }).catch((err) => {
      console.log(err);
      return 'fail to fetch data, err' + err;
    })
  }
}
