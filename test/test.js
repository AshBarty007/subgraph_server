var graphql = require('../src/graphql')
var mongodb = require('mongodb')

const dburl = "mongodb://root:" + encodeURIComponent("Mr0s8#dFdf#8s386di2ds") + "@barterswap.cluster-ck74h9ydda33.ap-southeast-1.docdb.amazonaws.com:27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false";
let MongoClient = mongodb.MongoClient;

function UpdateData() {
    clearPairs();
    graphql.query1(graphql.QuickSwap, 140).then(res => {
        updatePairs(res, "quickswap",137);
    }).catch(e => { console.log(e) });

    graphql.query1(graphql.SushiSwap, 40).then(res => {
        updatePairs(res, "sushiswap",137);
    }).catch(e => { console.log(e) });

    graphql.query2(graphql.PancakeSwap, 10).then(res => {
        updatePairs(res, "pancakeswap",56);
    }).catch(e => { console.log(e) });

    graphql.query3(graphql.UniSwap_v3, 10).then(res => {
        updatePairs(res, "uniswap-v3",137);
    }).catch(e => { console.log(e) });

    graphql.query1(graphql.UniSwap_v2, 550).then(res => {
        updatePairs(res, "uniswap-v2",1);
    }).catch(e => { console.log(e) });
}


async function updatePairs(pairs,dex,networkID) {
    var conn = null;
	var obj = {
        dex:dex,
        networkID:networkID,
        pairs:pairs
    };
    try {
        conn = await MongoClient.connect(dburl);
        let col = conn.db("BarterSwap").collection("Pairs");
        await col.insertOne(obj);
    } catch (err) {
        console.log("error:" + err.message);
    } finally {
        if (conn != null) conn.close();
    }
}

async function clearPairs() {
    var conn = null;
    try {
        conn = await MongoClient.connect(dburl);
        let test = conn.db("BarterSwap").collection("Pairs");
        // delete
        test.deleteMany();
    } catch (err) {
        console.log("error:" + err.message);
    } finally {
        if (conn != null) conn.close();
    }
}

async function findPairs(dex) {
    var conn = null;
    var result = {
        result :[]
    };
    try {
        conn = await MongoClient.connect(dburl);
        let whereStr = {dex:dex}
        let test = conn.db("BarterSwap").collection("Pairs");
        pairs = await test.find(whereStr).toArray();
	    result.result.push(pairs)
	    return result;
    } catch (err) {
        console.log("error:" + err.message);
    } finally {
        if (conn != null) conn.close();
    }
}

UpdateData();
findPairs("quickswap") 