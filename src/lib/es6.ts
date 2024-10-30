import { isUndefined } from '../base/const';
import forOwn from '../base/forOwn';

//---------------------------------------
// Array
//---------------------------------------

function find<T, S extends T>(src: T[], predicate: (value: T, index: number, obj: T[]) => value is S): S | undefined;
function find<T>(src: T[], predicate: (value: T, index: number, obj: T[]) => unknown): T | undefined
{
      let value;
      let i = -1;
      const len = src.length;
      while (++i < len)
      {
            value = src[i];
            if (predicate(value, i, src)) return value;
      }
}

function findIndex<T>(src: T[], predicate: (value: T, index: number, obj: T[]) => unknown): number
{
      let value;
      let i = -1;
      const len = src.length;
      while (++i < len)
      {
            value = src[i];
            if (predicate(value, i, src)) return i;
      }
      return -1;
}

function fill<T>(src: T[], value: T, start?: number, end?: number): T[]
{
      if (isUndefined(start)) start = -1;
      if (isUndefined(end)) end = src.length;
      let i = start;
      while (++i < end) src.push(value);
      return src;
}

//---------------------------------------
// ArrayConstructor
//---------------------------------------

function from<T, U>(arrayLike: ArrayLike<T>, mapfn?: (v: T, k: number) => U): U[];
function from<T>(arrayLike: ArrayLike<T>, mapfn?: (v: T, k: number) => T): T[]
{
      let i = -1;
      const len = arrayLike.length;
      const result = Array(len);
      if (isUndefined(mapfn)) while (++i < len) result[i] = arrayLike[i];
      else while (++i < len) result[i] = mapfn(arrayLike[i], i);
      return result;
}

//---------------------------------------
// ObjectConstructor
//---------------------------------------

function assign<T extends object, U>(target: T, source: U): T & U;
function assign<T extends object, U, V>(target: T, source1: U, source2: V): T & U & V;
function assign<T extends object, U extends Record<string, any>, V extends Record<string, any>, W extends Record<string, any>>(target: T, _source1?: U, _source2?: V, _source3?: W): T & U & V & W
{
      let i = -1;
      const sources = Array.prototype.slice.call(arguments, 1);
      const len = sources.length;
      while (++i < len)
      {
            const nextSource = sources[i];
            if (typeof nextSource !== 'object') continue;
            forOwn(nextSource, (value, key) => { (target as any)[key] = value; });
      }
      return target as T & U & V & W;
}

//---------------------------------------
// String
//---------------------------------------

function repeat(src: string, count: number): string
{
      return Array(count + 1).join(src);
}

export {
      find,
      findIndex,
      fill,
      from,
      assign,
      repeat
};
