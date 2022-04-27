import config from '../utils/config'
import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient

class Db {
    public client:mongodb.MongoClient | undefined
    static instance:Db | null

    static getInstance() {
        if(!Db.instance) this.instance = new Db()
        return this.instance
    }

    constructor() {
        console.log('constructor')
        this.connection()
    }

    connection():Promise<mongodb.MongoClient> {
        return new Promise<mongodb.MongoClient>((resolve, reject) => {
            if(!this.client) {
                MongoClient.connect(
                    config.url,
                    (err, client) => {
                        if(err){
                            reject(err)
                        } else {
                            console.log('db server start success!')
                            this.client = client
                            resolve(client)
                        }
                    }
                )
            } else {
                resolve(this.client)
            }
        })
    }

    insertCollection<T>(collection: string, data: T[] | T, many = false){
        return mongoDbQuery<InsertOneWriteOpResult<WithId<T>>>((db, resolve) => {
            if (many && Array.isArray(data)) {
                db.collection<T>(collection).insertMany(data as any).then(resolve as any)
                return
            }
            db.collection<T>(collection).insertOne(data as any).then(resolve)
        })
    }

}
