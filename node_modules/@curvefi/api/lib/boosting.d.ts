import { DictInterface } from "./interfaces";
export declare const getCrv: (...addresses: string[] | string[][]) => Promise<DictInterface<string> | string>;
export declare const getLockedAmountAndUnlockTime: (...addresses: string[] | string[][]) => Promise<DictInterface<{
    lockedAmount: string;
    unlockTime: number;
}> | {
    lockedAmount: string;
    unlockTime: number;
}>;
export declare const getVeCrv: (...addresses: string[] | string[][]) => Promise<DictInterface<string> | string>;
export declare const getVeCrvPct: (...addresses: string[] | string[][]) => Promise<DictInterface<string> | string>;
export declare const isApproved: (amount: string) => Promise<boolean>;
export declare const approveEstimateGas: (amount: string) => Promise<number>;
export declare const approve: (amount: string) => Promise<string[]>;
export declare const createLockEstimateGas: (amount: string, days: number) => Promise<number>;
export declare const createLock: (amount: string, days: number) => Promise<string>;
export declare const increaseAmountEstimateGas: (amount: string) => Promise<number>;
export declare const increaseAmount: (amount: string) => Promise<string>;
export declare const increaseUnlockTimeEstimateGas: (days: number) => Promise<number>;
export declare const increaseUnlockTime: (days: number) => Promise<string>;
export declare const withdrawLockedCrvEstimateGas: () => Promise<number>;
export declare const withdrawLockedCrv: () => Promise<string>;
