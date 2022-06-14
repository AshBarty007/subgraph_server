import { IDict, IPoolData, ICurve } from "../interfaces";
export declare function getFactoryPoolsDataFromApi(this: ICurve, isCrypto: boolean): Promise<IDict<IPoolData>>;
