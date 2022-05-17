const request = require('request');
import { ETH_PRICE_API } from '../src/providers/utils/url'

async function b(){
    await request(ETH_PRICE_API, { json: true }, (err: any, res: any, body: any) => {
        if (err) {
            return console.log(err);
        }
        console.log(Number(body.result.ethusd))
    });
}

b()