export interface ISubgraphProvider {
  getPool: () => any | undefined;
}

export interface V3SubgraphPool {
  id: string;
  feeTier: string;
  liquidity: string;
  token0: {
    id: string;
  };
  token1: {
    id: string;
  };
  tvlETH: number;
  tvlUSD: number;
}

export interface V2SubgraphPool {
  id: string;
  token0: {
    id: string;
  };
  token1: {
    id: string;
  };
  supply: number;
  reserve: number;
}

export type RawETHV2SubgraphPool = {
  id: string;
  token0: {
    symbol: string;
    id: string;
  };
  token1: {
    symbol: string;
    id: string;
  };
  totalSupply: string;
  reserveETH: string;
  trackedReserveETH: string;
};

export type RawETHV3SubgraphPool = {
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

export type RawBNBV2SubgraphPool = {
  id: string;
  token0: {
    symbol: string;
    id: string;
  };
  token1: {
    symbol: string;
    id: string;
  };
  totalSupply: string;
  reserveBNB: string;
  trackedReserveBNB: string;
};


const bscThreshold = 0.25;
const ethThreshold = 0.025;

export function sanitizeBSCPools(
  pools: RawBNBV2SubgraphPool[]
): V2SubgraphPool[] {
  // TODO: Remove. Temporary fix to ensure tokens without trackedReserveBNB are in the list.
  const FEI = '0x956f47f50a910163d8bf957cf5846d573e7f87ca';
  const poolsSanitized: V2SubgraphPool[] = pools
    .filter((pool) => {
      return (
        pool.token0.id == FEI ||
        pool.token1.id == FEI ||
        parseFloat(pool.trackedReserveBNB) > bscThreshold
      );
    })
    .map((pool) => {
      return {
        ...pool,
        id: pool.id.toLowerCase(),
        token0: {
          id: pool.token0.id.toLowerCase(),
        },
        token1: {
          id: pool.token1.id.toLowerCase(),
        },
        supply: parseFloat(pool.totalSupply),
        reserve: parseFloat(pool.trackedReserveBNB),
      };
    });
  return poolsSanitized;
}

export function sanitizeV3Pools(pools: RawETHV3SubgraphPool[]): V3SubgraphPool[] {
  const poolsSanitized = pools
    .filter((pool) => parseInt(pool.liquidity) > 0)
    .map((pool) => {
      const { totalValueLockedETH, totalValueLockedUSD, ...rest } = pool;

      return {
        ...rest,
        id: pool.id.toLowerCase(),
        token0: {
          id: pool.token0.id.toLowerCase(),
        },
        token1: {
          id: pool.token1.id.toLowerCase(),
        },
        tvlETH: parseFloat(totalValueLockedETH),
        tvlUSD: parseFloat(totalValueLockedUSD),
      };
    });
  return poolsSanitized;
}

export function sanitizeETHV2Pools(
  pools: RawETHV2SubgraphPool[]
): V2SubgraphPool[] {
  // TODO: Remove. Temporary fix to ensure tokens without trackedReserveBNB are in the list.
  const FEI = '0x956f47f50a910163d8bf957cf5846d573e7f87ca';
  const poolsSanitized: V2SubgraphPool[] = pools
    .filter((pool) => {
      return (
        pool.token0.id == FEI ||
        pool.token1.id == FEI ||
        parseFloat(pool.trackedReserveETH) > ethThreshold
      );
    })
    .map((pool) => {
      return {
        ...pool,
        id: pool.id.toLowerCase(),
        token0: {
          id: pool.token0.id.toLowerCase(),
        },
        token1: {
          id: pool.token1.id.toLowerCase(),
        },
        supply: parseFloat(pool.totalSupply),
        reserve: parseFloat(pool.trackedReserveETH),
      };
    });
  return poolsSanitized;
}