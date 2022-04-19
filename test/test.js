var http = require('http')
var hostname = "0.0.0.0"
var port = 9002

var pairs = [{"data1":1,"data2":"ok"},{"data1":2,"data2":"ok"}]
const server = http.createServer((req, res) => {
	let dex = "UniSwap_V3"
	let networkID = 1;
	var obj;
	switch (dex){
        case "QuickSwap":
            obj = {
                QuickSwap: pairs,
                networkID:networkID
            };
			break;
        case "SushiSwap":
            obj = {
                SushiSwap: pairs,
                networkID:networkID
            };
			break;
        case "ApeSwap":
            obj = {
                ApeSwap: pairs,
                networkID:networkID
            };
			break;
        case "PancakeSwap":
            obj = {
                PancakeSwap: pairs,
                networkID:networkID
            };
			break;
        case "UniSwap_V2":
            obj = {
                UniSwap_V2: pairs,
                networkID:networkID
            };     
			break;
        case "UniSwap_V3":
            obj = {
                UniSwap_V3: pairs,
                networkID:networkID
            };        
			break;
        default:
            obj = {
                unKnow:pairs,
                networkID:networkID
            }                                                        
    }
    res.writeHead(200,{"Content-Type":"application/json"});
    res.end(JSON.stringify(obj));
})

server.listen(port, hostname, () => {
	console.log("server is running...")
})

