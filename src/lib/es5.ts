import { isUndefined, nativeSlice } from '../base/const';
import forOwn from '../base/forOwn';

//---------------------------------------
// Array
//---------------------------------------

/**
 * 数组的 indexOf 方法
 * @param src 数组
 * @param searchElement 搜索的元素
 * @param fromIndex 开始搜索的索引
 * @returns 搜索到的索引，没找到返回 -1
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * alert(indexOf(arr, 3)); // 2
 * alert(indexOf(arr, 6)); // -1
 */
function indexOf<T>(src: T[], searchElement: T, fromIndex?: number)
{
      const { length } = src;
      if (isUndefined(fromIndex)) fromIndex = 0;
      else if (fromIndex < 0) fromIndex = Math.max(0, length + fromIndex);
      let i = fromIndex - 1;
      while (++i < length) if (src[i] === searchElement) return i;
      return -1;
}

/**
 * 数组的 lastIndexOf 方法,从后往前搜索,
 * @param src 数组
 * @param searchElement 搜索的元素
 * @param fromIndex 开始搜索的索引
 * @returns 搜索到的索引，没找到返回 -1
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * alert(lastIndexOf(arr, 3)); // 2
 * alert(lastIndexOf(arr, 6)); // -1
 */
function lastIndexOf<T>(src: T[], searchElement: T, fromIndex?: number)
{
      const { length } = src;
      if (isUndefined(fromIndex)) fromIndex = 0;
      else if (fromIndex < 0) fromIndex = Math.max(0, length + fromIndex);
      let i = fromIndex + 1;
      while (--i >= 0) if (src[i] === searchElement) return i;
      return -1;
}

function forEach<T>(src: T[], callbackfn: (value: T, index: number, array: T[]) => void): void
{
      let i = -1;
      const len = src.length;
      while (++i < len) callbackfn(src[i], i, src);
}

function map<T, U>(src: T[], callbackfn: (value: T, index: number, array: T[]) => U): U[]
{
      let i = -1;
      const len = src.length;
      const result = Array(len);
      while (++i < len) result[i] = callbackfn(src[i], i, src);
      return result;
}

function filter<T, S extends T>(src: T[], predicate: (value: T, index: number, array: T[]) => value is S): S[];
function filter<T>(src: T[], predicate: (value: T, index: number, array: T[]) => unknown): T[]
{
      let i = -1;
      const len = src.length;
      const result = Array(len);
      while (++i < len) if (predicate(src[i], i, src)) result[i] = src[i];
      return result;
}

function reduce<T>(src: T[], callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
function reduce<T, U>(src: T[], callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue?: U): U
{
      let i = -1;
      let accumulator: U;
      const len = src.length;
      initialValue ? accumulator = initialValue : accumulator = src[0] as unknown as U;
      while (++i < len) accumulator = callbackfn(accumulator, src[i], i, src);
      return accumulator;
}

//---------------------------------------
// ObjectConstructor
//---------------------------------------

function create(o: any, propertiesObject?: any): any
{
      if (typeof o !== 'object' && typeof o !== 'function') throw 'TypeError: Object prototype may only be an Object or null';
      const result = function() { } as any;
      result.prototype = o;
      propertiesObject && forOwn(propertiesObject, (value, key) => { result[key] = value; });
      return new result();
}

function keys(o: object): string[]
{
      const result: string[] = [];
      forOwn(o, v => { result.push(v); });
      return result;
}

//---------------------------------------
// Function
//---------------------------------------

function bind(fn: AnyFunction, thisArg: any): any
{
      const args = nativeSlice.call(arguments, 1);
      return function A(this: AnyObject)
      {
            const allArgs = args.concat(nativeSlice.call(arguments));
            if (this.__proto__ === A.prototype)
            {
                  const O = { __proto__: fn.prototype };
                  fn.apply(O, allArgs);
                  return O;
            }
            return fn.apply(thisArg, allArgs);
      };
}

//---------------------------------------
// String
//---------------------------------------

function trim(src: string): string
{
      return src.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

function trimEnd(src: string): string
{
      return src.replace(/[\s\uFEFF\xA0]+$/, '');
}

function trimStart(src: string): string
{
      return src.replace(/^[\s\uFEFF\xA0]+/, '');
}

export {
      indexOf,
      lastIndexOf,
      forEach,
      map,
      filter,
      reduce,
      create,
      keys,
      bind,
      trim,
      trimEnd,
      trimStart
};
