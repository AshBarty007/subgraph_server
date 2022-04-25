
export type ApeSwap_Subgraph = {
    id: string;
    token0: {
        id: string;
        symbol: string;
    };
    token1: {
        id: string;
        symbol: string;
    };
    totalSupply: string;
    reserveETH: string;
    trackedReserveETH: string;
};

export type QuickSwap_Subgraph = {
    id: string;
    token0: {
        id: string;
        symbol: string;
    };
    token1: {
        id: string;
        symbol: string;
    };
    totalSupply: string;
    reserveETH: string;
    trackedReserveETH: string;
};

export type UniSwapV2_Subgraph = {
    id: string;
    token0: {
        id: string;
        symbol: string;
    };
    token1: {
        id: string;
        symbol: string;
    };
    totalSupply: string;
    reserveETH: string;
    trackedReserveETH: string;
};

export type SushiSwap_Subgraph = {
    id: string;
    token0: {
        id: string;
        symbol: string;
    };
    token1: {
        id: string;
        symbol: string;
    };
    totalSupply: string;
    reserveETH: string;
    trackedReserveETH: string;
};

export type Pancake_Subgraph = {
    id: string;
    token0: {
        id: string;
        symbol: string;
    };
    token1: {
        id: string;
        symbol: string;
    };
    totalSupply: string;
    reserveBNB: string;
    trackedReserveBNB: string;
};


export type UniSwapV3_Subgraph = {
    id: string;
    feeTier: string;
    liquidity: string;
    token0: {
        symbol: string;
        id: string;
    };
    token1: {
        symbol: string;
        id: string;
    };
    totalValueLockedUSD: string;
    totalValueLockedETH: string;
};