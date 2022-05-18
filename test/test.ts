const request = require('request');
const api = "https://api.curve.fi/api/getETHprice"; 

function ajax(URL:string) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest(); 
        req.open('GET', URL, true);
        req.onload = function () {
        if (req.status === 200) { 
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            } 
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send(); 
    });
}

ajax(api).then(function onFulfilled(value){
    document.write('context:' + value); 
}).catch(function onRejected(error){
    document.write('error:' + error); 
});

// request(api, { json: true }, (err: any, res: any, body: any) => {
//     console.log(err)
//     console.log(body.data.price)
// })