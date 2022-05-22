import { BarterSwapDB, TableName } from '../src/mongodb/client'
import { dexName } from '../src/providers/utils/params'

let client = new BarterSwapDB()

async function a(table: string) {
    console.log(table)
    for (let name in dexName) {
        let filter = { name: name }
        console.log(filter)
        await client.findData(table, filter).then((ret: any) => {
            let data = JSON.parse(ret)
            try {
                if (name != dexName.uniswap_v3) {
                    console.log(name, data.length)
                    //console.log(name,data[0].result.pairs.length)
                } else {
                    console.log(name, data.length)
                    //console.log(name,data[0].result.pools.length)
                }
            } catch (err) {
                console.log(err)
            }
        })

    }
}
async function b() {
    await a(TableName.OnChainPools)
    console.log("---------")
    await a(TableName.SimplePools)
    console.log("---------")
    await a(TableName.DetailedPools)
}
b()

//数据库没删除
//api访问次数调查