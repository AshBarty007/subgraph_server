import { ethers } from 'ethers'
import { Pool } from '@uniswap/v3-sdk'
import { Token } from '@uniswap/sdk-core'
import { abi as IUniswapV3PoolABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'


//const provider = new ethers.providers.JsonRpcProvider('https://api.etherscan.io/api?module=contract&action=getabi&address=0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413&apikey=39M44K1IVEI2QWXV669BE81JIYUZ6JB8TQ')
const provider = ethers.getDefaultProvider()

interface Immutables {
  factory: string
  token0: string
  token1: string
  fee: number
  tickSpacing: number
  maxLiquidityPerTick: ethers.BigNumber
}

interface State {
  liquidity: ethers.BigNumber
  sqrtPriceX96: ethers.BigNumber
  tick: number
  observationIndex: number
  observationCardinality: number
  observationCardinalityNext: number
  feeProtocol: number
  unlocked: boolean
}

async function getPoolImmutables(poolContract:ethers.Contract) {
  const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] = await Promise.all([
    poolContract.factory(),
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
    poolContract.tickSpacing(),
    poolContract.maxLiquidityPerTick(),
  ])

  const immutables: Immutables = {
    factory,
    token0,
    token1,
    fee,
    tickSpacing,
    maxLiquidityPerTick,
  }
  return immutables
}

async function getPoolState(poolContract:ethers.Contract) {
  const [liquidity, slot] = await Promise.all([poolContract.liquidity(), poolContract.slot0()])

  const PoolState: State = {
    liquidity,
    sqrtPriceX96: slot[0],
    tick: slot[1],
    observationIndex: slot[2],
    observationCardinality: slot[3],
    observationCardinalityNext: slot[4],
    feeProtocol: slot[5],
    unlocked: slot[6],
  }

  return PoolState
}

export async function onchainQuery(poolAddress:string,decimals0: number,decimals1: number) {
  const poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolABI, provider)

  const [immutables, state] = await Promise.all([getPoolImmutables(poolContract), getPoolState(poolContract)])

  const TokenA = new Token(3, immutables.token0, decimals0)

  const TokenB = new Token(3, immutables.token1, decimals1)

  let result = {
      id : poolAddress,
      fee : immutables.fee,
      liquidity : state.liquidity.toString(),
      token0:{
          id: TokenA.address,
          symbol: TokenA.symbol
      },
      token1:{
        id: TokenB.address,
        symbol: TokenA.symbol
      }
  }
  return result
}

