import {MongoClient,Db,Filter, UpdateFilter} from 'mongodb'
import MongoDBConfig  from './config'

interface Res {
    db: MongoClient
    Db: Db
  }

export class BarterSwapDB {
    private url:string
    private dbName:string

    static instance:BarterSwapDB | null
    static getInstance() {
        if(!BarterSwapDB.instance) this.instance = new BarterSwapDB()
        return this.instance
    }

    constructor(
        url = MongoDBConfig.default,
        dbName = MongoDBConfig.database
    ){
        this.url = url
        this.dbName = dbName
    }

    private async connectDB():Promise<Res>{
        return new Promise((res, rej) => {
            MongoClient.connect(this.url).then((db) => {
                res({db:db,Db:db.db(this.dbName)})
            }).catch((err) => {
                rej(err)
            })
        })
    }

    async insertData<Document>(collectionName: string, data: Document[] | Document, many = false) {
        let client = await this.connectDB()
        let collection = client.Db.collection(collectionName)
        if (many && Array.isArray(data)) {
            collection.insertMany(data as any).catch((err)=>{
                console.log(err)
            })
        }else{
            collection.insertOne(data as any).catch((err)=>{
                console.log(err)
            })
        }
    }

    async findData<Document>(collectionName: string, filter: Filter<Document>):Promise<string>{
        let client = await this.connectDB()
        let collection = client.Db.collection(collectionName)
        return new Promise((res,rej)=>{
            collection.find(filter).toArray().then((data)=>{
                res(JSON.stringify(data))
            }).catch((err)=>{
                rej(err)
            })
        })
    }

    async deleteData<Document>(collectionName: string, filter: Filter<Document>, many = false) {
        let client = await this.connectDB()
        let collection = client.Db.collection(collectionName)
        if (many && Array.isArray(filter)) {
            collection.deleteMany(filter as any).catch((err)=>{
                console.log(err)
            })
        }else{
            collection.deleteOne(filter as any).catch((err)=>{
                console.log(err)
            })
        }
    }

    async updateData<Document>(collectionName: string, filter: Filter<Document> ,updateFilter: UpdateFilter<Document>, many = false) {
        let client = await this.connectDB()
        let collection = client.Db.collection(collectionName)
        if (many){
            // await collection.updateMany(filter, updateFilter)
            // .catch((err)=>{console.log(err)})
        }else{
            await collection.updateOne(filter, updateFilter)
            .catch((err)=>{console.log(err)})
        }
    }

}

export enum TableName {
    DetailedPools = 'DetailedPools',
    SimplePools = 'SimplePools',
    OnChainPools = 'OnChainPools',
  }
