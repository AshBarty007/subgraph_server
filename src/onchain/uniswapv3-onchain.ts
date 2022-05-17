import { ethers } from 'ethers'
import { abi as IUniswapV3PoolABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import { ChainId } from '../providers/utils/chainId'
import { BarterSwapDB, TableName } from '../mongodb/client'

const provider = new ethers.providers.JsonRpcProvider('https://api.mycryptoapi.com/eth')

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

async function getPoolImmutables(poolContract: ethers.Contract) {
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

async function getPoolState(poolContract: ethers.Contract) {

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

export async function onchainQuery(chainId: ChainId, poolAddress: string, token0Address: string, token1Address: string) {
  let DB = new BarterSwapDB();
  const poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolABI, provider)
  const [immutables, state] = await Promise.all([getPoolImmutables(poolContract), getPoolState(poolContract)])

  let result = {
    id: poolAddress,
    fee: immutables.fee,
    liquidity: state.liquidity.toString(),
    token0: {
      id: token0Address,
    },
    token1: {
      id: token1Address,
    }
  }
    //console.log(result)
  let data = {
    updateTime: Date.parse(new Date().toString()),
    name: "uniswap_v3",
    chainId: chainId,
    result: result,
  }
  DB.deleteData(TableName.OnChainPools, {name: "uniswap_v2"})
  DB.insertData(TableName.OnChainPools, data)
}

//onchainQuery(ChainId.POLYGON,'0x5777d92f208679db4b9778590fa3cab3ac9e2168','','')