"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aTokensPolygon = exports.ycTokensPolygon = exports.yTokensPolygon = exports.cTokensPolygon = exports.DECIMALS_LOWER_CASE_POLYGON = exports.DECIMALS_POLYGON = exports.COINS_POLYGON = exports.USD_COINS_LOWER_CASE_POLYGON = exports.USD_COINS_POLYGON = exports.EUR_COINS_LOWER_CASE_POLYGON = exports.EUR_COINS_POLYGON = exports.LINK_COINS_LOWER_CASE_POLYGON = exports.LINK_COINS_POLYGON = exports.ETH_COINS_LOWER_CASE_POLYGON = exports.ETH_COINS_POLYGON = exports.BTC_COINS_LOWER_CASE_POLYGON = exports.BTC_COINS_POLYGON = void 0;
exports.BTC_COINS_POLYGON = {
    wbtc: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
    renbtc: "0xDBf31dF14B66535aF65AaC99C32e9eA844e14501",
    amwbtc: "0x5c2ed810328349100A66B82b78a1791B101C9D61", // amWBTC
};
// @ts-ignore
exports.BTC_COINS_LOWER_CASE_POLYGON = Object.fromEntries(Object.entries(exports.BTC_COINS_POLYGON).map(function (entry) { return [entry[0], entry[1].toLowerCase()]; }));
exports.ETH_COINS_POLYGON = {
    weth: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    amweth: "0x28424507fefb6f7f8E9D3860F56504E4e5f5f390", // amWETH
};
// @ts-ignore
exports.ETH_COINS_LOWER_CASE_POLYGON = Object.fromEntries(Object.entries(exports.ETH_COINS_POLYGON).map(function (entry) { return [entry[0], entry[1].toLowerCase()]; }));
exports.LINK_COINS_POLYGON = {};
// @ts-ignore
exports.LINK_COINS_LOWER_CASE_POLYGON = Object.fromEntries(Object.entries(exports.LINK_COINS_POLYGON).map(function (entry) { return [entry[0], entry[1].toLowerCase()]; }));
exports.EUR_COINS_POLYGON = {
    eurt: "0x7BDF330f423Ea880FF95fC41A280fD5eCFD3D09f", // EURT
};
// @ts-ignore
exports.EUR_COINS_LOWER_CASE_POLYGON = Object.fromEntries(Object.entries(exports.EUR_COINS_POLYGON).map(function (entry) { return [entry[0], entry[1].toLowerCase()]; }));
exports.USD_COINS_POLYGON = {
    dai: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    usdc: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    usdt: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    amdai: "0x27F8D03b3a2196956ED754baDc28D73be8830A6e",
    amusdc: "0x1a13F4Ca1d028320A707D99520AbFefca3998b7F",
    amusdt: "0x60D55F02A771d515e077c9C2403a1ef324885CeC",
    am3crv: "0xE7a24EF0C5e95Ffb0f6684b813A78F2a3AD7D171", // am3CRV
};
// @ts-ignore
exports.USD_COINS_LOWER_CASE_POLYGON = Object.fromEntries(Object.entries(exports.USD_COINS_POLYGON).map(function (entry) { return [entry[0], entry[1].toLowerCase()]; }));
exports.COINS_POLYGON = __assign(__assign(__assign(__assign(__assign(__assign({}, exports.BTC_COINS_POLYGON), exports.ETH_COINS_POLYGON), exports.LINK_COINS_POLYGON), exports.EUR_COINS_POLYGON), exports.USD_COINS_POLYGON), { crv: "0x172370d5cd63279efa6d502dab29171933a610af", matic: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" });
exports.DECIMALS_POLYGON = {
    "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063": 18,
    "0x2791bca1f2de4661ed88a30c99a7a9449aa84174": 6,
    "0xc2132d05d31c914a87c6611c10748aeb04b58e8f": 6,
    "0x27F8D03b3a2196956ED754baDc28D73be8830A6e": 18,
    "0x1a13F4Ca1d028320A707D99520AbFefca3998b7F": 6,
    "0x60D55F02A771d515e077c9C2403a1ef324885CeC": 6,
    "0xE7a24EF0C5e95Ffb0f6684b813A78F2a3AD7D171": 18,
    "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6": 8,
    "0xDBf31dF14B66535aF65AaC99C32e9eA844e14501": 8,
    "0x5c2ed810328349100A66B82b78a1791B101C9D61": 8,
    "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619": 18,
    "0x28424507fefb6f7f8E9D3860F56504E4e5f5f390": 18,
    "0x7BDF330f423Ea880FF95fC41A280fD5eCFD3D09f": 6,
    "0x172370d5cd63279efa6d502dab29171933a610af": 18,
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE": 18, // MATIC
};
// @ts-ignore
exports.DECIMALS_LOWER_CASE_POLYGON = Object.fromEntries(Object.entries(exports.DECIMALS_POLYGON).map(function (entry) { return [entry[0].toLowerCase(), entry[1]]; }));
exports.cTokensPolygon = [];
exports.yTokensPolygon = [];
exports.ycTokensPolygon = [];
exports.aTokensPolygon = [
    "0x27F8D03b3a2196956ED754baDc28D73be8830A6e",
    "0x1a13F4Ca1d028320A707D99520AbFefca3998b7F",
    "0x60D55F02A771d515e077c9C2403a1ef324885CeC",
    "0x5c2ed810328349100A66B82b78a1791B101C9D61",
    "0x28424507fefb6f7f8E9D3860F56504E4e5f5f390", // amWETH
];
