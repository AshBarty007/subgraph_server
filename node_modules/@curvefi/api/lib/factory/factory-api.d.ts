import { DictInterface, PoolDataInterface, ICurve } from "../interfaces";
export declare function getFactoryPoolsDataFromApi(this: ICurve, isCrypto: boolean): Promise<DictInterface<PoolDataInterface>>;
