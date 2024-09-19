declare type MouseEventCallback <T> = (this: T, e: MouseEvent) => void;

declare type Exclude<T, U> = T extends U ? never : T;

declare type Extract<T, U> = T extends U ? T : never;

declare type Omit<T, K extends keyof unknown> = Pick<T, Exclude<keyof T, K>>;

declare type ArrayIterator<T, TResult> = (value: T, index: number, collection: T[]) => TResult;

declare type ObjectIterator<TObject, TResult> = (
      value: TObject[keyof TObject],
      key: string,
      collection: TObject
) => TResult;

declare type BuildIndexUnion<T extends number, K extends unknown[] = []> = K['length'] extends T
      ? K[number]
      : BuildIndexUnion<T, [...K, K['length']]>;

declare type Parameters<T extends (...args: unknown) => unknown> = T extends (
      ...args: infer P
) => unknown
      ? P
      : never;

declare type ConstructorParameters<T extends abstract new (...args: unknown) => unknown> =
      T extends abstract new (...args: infer P) => unknown ? P : never;

declare type ReturnType<T extends (...args: unknown) => unknown> = T extends (
      ...args: unknown
) => infer R
      ? R
      : unknown;

declare type InstanceType<T extends abstract new (...args: unknown) => unknown> =
      T extends abstract new (...args: unknown) => infer R ? R : unknown;

type NumberRange<
      Min,
      Max extends number,
      Result extends number[] = []
> = Result['length'] extends Max
      ? Result[number]
      : NumberRange<Min, Max, [Result['length'], ...Result]>;

type MakeTuple<
      Target extends number,
      CurTuple extends any[] = []
> = CurTuple['length'] extends Target ? CurTuple : MakeTuple<Target, [...CurTuple, any]>;

declare type FilterConditionally<Source, Condition> = Pick<
      Source,
      { [K in keyof Source]: Source[K] extends Condition ? K : never }[keyof Source]
>;

declare type UnionKeys<T> = T extends unknown ? keyof T : never;
declare type UnionValues<T, K extends PropertyKey> = T extends Record<K, infer U> ? U : never;
declare type OfUnion<T> = {
      [P in UnionKeys<T>]: UnionValues<T, P>;
};

declare type Required<T> = {
      [P in keyof T]-?: T[P];
};
