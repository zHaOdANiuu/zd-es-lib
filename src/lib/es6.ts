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
      if (start === undef) start = -1;
      if (end === undef) end = src.length;
      let i = start;
      while (++i < end) src.push(value);
      return src;
}

//---------------------------------------
// ArrayConstructor
//---------------------------------------

function from<T>(arrayLike: ArrayLike<T>): T[];
function from<T, U>(arrayLike: ArrayLike<T>, mapfn?: (v: T, k: number) => U): U[]
{
      let marker = false;
      if (typeof mapfn === 'function') marker = true;
      let i = -1;
      const len = arrayLike.length;
      const result = new Array(i);
      while (++i < len)
      {
            const value = arrayLike[i];
            marker ? result.push((mapfn as any)(value, i)) : result.push(value);
      }
      return result;
}

//---------------------------------------
// ObjectConstructor
//---------------------------------------

function assign<T extends {}, U>(target: T, source: U): T & U;
function assign<T extends {}, U, V>(target: T, source1: U, source2: V): T & U & V;
function assign<T extends {}, U, V, W>(target: T, _source1?: U, _source2?: V, _source3?: W): T & U & V & W
{
      if (target === null) throw 'TypeError: Cannot convert undefined or null to object';
      let i = -1;
      const sources: [U, V, W] = Array.prototype.slice.call(arguments, 1);
      const len = sources.length;
      while (++i < len)
      {
            const nextSource = sources[i];
            if (nextSource === null) continue;
            for (const nextKey in nextSource)
                  if (Object.prototype.hasOwnProperty.call(nextSource, nextKey))
                        target[nextKey as keyof T] = (nextSource[nextKey as keyof typeof nextSource] as any);
      }
      return target as T & U & V & W;
}

//---------------------------------------
// String
//---------------------------------------

function repeat(src: string, count: number): string
{
      let result = '';
      let i = -1;
      while (++i < count) result += src;
      return result;
}

export { find, findIndex, fill, from, assign, repeat };
