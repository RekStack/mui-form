// TODO: remove this type
export type ObjectLike = object;

export type DistributiveOmit<T, K extends PropertyKey> = T extends any ? Omit<T, K> : never;

export type DistributivePick<T, K extends keyof T> = T extends any ? Pick<T, K> : never;
