// import { BarterSwapDB, TableName } from '../src/mongodb/client'
// import { dexName } from '../src/providers/utils/params'

// let client = new BarterSwapDB()

// async function a(){
//     for (let name in dexName){
//         await client.findData(TableName.OnChainPools,name).then((data:any)=>{

//         })
        
//     }    
// }

// a()

const schedule = require('node-schedule');

const scheduleTask = () => {
    schedule.scheduleJob('0 */1 * * * *', () => {
        console.log(new Date().toLocaleString(), 'updated per 1 min');
    });

    schedule.scheduleJob('20 */2 * * * *', () => {
        console.log(new Date().toLocaleString(), 'updated per 2 min');
    });

    schedule.scheduleJob('40 */3 * * * *', () => {
        console.log(new Date().toLocaleString(), 'updated per 3 min');
    });
}
scheduleTask();