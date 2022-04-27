// import {
//    Db, Filter, InsertOneResult, MongoClient, UpdateFilter, UpdateResult, WithId,
//  } from 'mongodb'
//  import  MongoDBConfig  from '../src/mongodb/utils/config'
 
//  const {
//    host, port, user, password, database, auth,
//  } = MongoDBConfig
 
//  const url = auth ? `mongodb://${user}:${password}@${host}:${port}/${database}` : `mongodb://${host}:${port}/${database}`
 
//  interface Res {
//    db: MongoClient
//    Db: Db
//  }
 
//  export function getDBConnection(): Promise<Res> {
//    return new Promise((res, rej) => {
//      MongoClient.connect(url).then((db) => {
//        res({
//          db,
//          Db: db.db(database),
//        })
//      }).catch((err) => {
//        rej(err)
//      })
//    })
//  }
 
//  type Callback<T> = (db: Db, resolve: (value: T | PromiseLike<T>) => void) => void
 
//  export function query<T>(callback: Callback<T>): Promise<T> {
//    const p = new Promise<T>((resolve, rej) => {
//      getDBConnection().then(({ db, Db }) => {
//        callback(Db, resolve)
//        p.catch((e) => rej(e))
//          .finally(() => {
//            db.close()
//          })
//      })
//    })
//    return p
//  }
 
//  export const mongoDbQuery = query
//  export function updateCollection<T>(
//    collection: string,
//    query: Filter<T>,
//    data: UpdateFilter<T>,
//    many = false,
//  ) {
//    return mongoDbQuery<UpdateResult>((db, resolve) => {
//      if (many) {
//        db.collection<T>(collection).updateMany(query, data).then(resolve)
//        return
//      }
//      db.collection<T>(collection).updateOne(query, data).then(resolve)
//    })
//  }
 
//  export function insertCollection<T>(collection: string, data: T[] | T, many = false) {
//    return mongoDbQuery<InsertOneResult<WithId<T>>>((db, resolve) => {
//      if (many && Array.isArray(data)) {
//        db.collection<T>(collection).insertMany(data as any).then(resolve as any)
//        return
//      }
//      db.collection<T>(collection).insertOne(data as any).then(resolve)
//    })
//  }
//  export function findCollection<T>(collection: string, query: Filter<T>): Promise<T[]> {
//    return mongoDbQuery<T[]>((db, resolve) => {
//      db.collection<T>(collection).find(query).toArray().then((data) => {
//        resolve(data)
//      })
//    })
//  }

import {BarterSwap_MongoDB} from '../src/mongodb/operator/client'

let dbClient = new BarterSwap_MongoDB("mongodb://127.0.0.1:27017","TestDB");
let Table = "Test"
let firstData = {'a':1}
let newData = {$set:{'b':2}}
let filter = {}

dbClient.connectDB();

async function test1(){
   await dbClient.insertData(Table,{'a':1});
   let result1 = await dbClient.findData(Table,filter);
   console.log("1.",result1)
   await dbClient.updateData(Table,{'a':1},{$set:{'b':2}});
   let result2 = await dbClient.findData(Table,filter);
   console.log("2.",result2)
   await dbClient.deleteData(Table,{'a':1});
   let result3 = await dbClient.findData(Table,filter);
   console.log("3.",result3)
   return
}

async function test2(){
   await dbClient.updateData(Table,firstData,newData);
   let result2 = await dbClient.findData(Table,newData);
   console.log("2.",result2)

}
async function test3(){
   await dbClient.deleteData(Table,filter);
   let result3 = await dbClient.findData(Table,filter);
   console.log("3.",result3)
}

test1()
// test2()
// test3()