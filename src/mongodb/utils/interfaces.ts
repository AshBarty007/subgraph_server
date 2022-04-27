
interface DBI {

    insert<T>(collectionName:string, doc:T):Promise<boolean>

    insertMany<T>(collectionName:string, docs:T[]):Promise<boolean>

    delete(collectionName:string, filter:object):Promise<boolean>

    update(collectionName:string, filter:object,update:object):Promise<boolean>

    find(collectionName:string, filter:object):Promise<any[]>

    aggregate(collectionName:string, pipeline:object[]):Promise<any[]>
}

class Db {
    static instance:Db | null
    static getInstance() {
        if(!Db.instance) this.instance = new Db()
        return this.instance
    }
    constructor() {
        console.log('constructor')
    }
}