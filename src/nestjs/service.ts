import { BarterSwapDB, TableName } from '../mongodb/client'
import { Injectable, Query } from '@nestjs/common';
import { dexName } from '../providers/utils/params';

const DB = new BarterSwapDB();
@Injectable()
export class AppService {

  async getPools(dex: string[]): Promise<void> {
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

    await DB.findData(TableName.SimplePools, filter).then((ret: any) => {
      let result = JSON.parse(ret)
      console.log('result',ret)
      for (let i = 0; i < dex.length; i++) {
        try {
          switch (result[i].name) {
            case dexName.uniswap_v3:
              pools.uniswap_v3 = result[i].result.pools;
              break;
            case dexName.uniswap_v2:
              pools.uniswap_v2 = result[i].result.pairs;
              break;
            case dexName.sushiswap:
              pools.sushiswap = result[i].result.pairs;
              break;
            case dexName.quickswap:
              pools.quickswap = result[i].result.pairs;
              break;
            case dexName.pancakeswap:
              pools.pancakeswap = result[i].result.pairs;
              break;
            case dexName.curve:
              pools.curve = result[i].result;
              break;
            case dexName.balancer:
              pools.balancer = result[i].result;
              break;
          }
        } catch (err) {
          console.log("error by returning db data,", err);
        }
      }
      console.log('pools',pools)
      return JSON.stringify(pools);
    }).catch((err) => {
      console.log('fail to fetch data, err' + err);
      return 'fail to fetch data, err' + err;
    })
  }
}
