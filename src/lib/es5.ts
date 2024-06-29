
//---------------------------------------
// Array
//---------------------------------------

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
      const result = new Array(i);
      while (++i < len) result.push(callbackfn(src[i], i, src));
      return result;
}

function filter<T, S extends T>(src: T[], predicate: (value: T, index: number, array: T[]) => value is S): S[];
function filter<T>(src: T[], predicate: (value: T, index: number, array: T[]) => unknown): T[]
{
      let i = -1;
      const len = src.length;
      const result = [];
      while (++i < len) predicate(src[i], i, src) && result.push(src[i]);
      return result;
}

function reduce<T>(src: T[], callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
function reduce<T>(src: T[], callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
function reduce<T, U>(src: T[], callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue?: U): U
{
      let i = -1;
      let accumulator: U;
      const len = src.length;
      initialValue === undefined
            ? accumulator = src[0] as unknown as U
            : accumulator = initialValue;
      while (++i < len) accumulator = callbackfn(accumulator, src[i], i, src);
      return accumulator;
}

//---------------------------------------
// ObjectConstructor
//---------------------------------------

function create(o: any, propertiesObject?: any): any
{
      if (typeof o !== 'object' && typeof o !== 'function') throw 'TypeError: Object prototype may only be an Object or null';
      const result = function() { /** */ } as any;
      result.prototype = o;
      if (propertiesObject)
            for (const prop in propertiesObject)
                  if (Object.prototype.hasOwnProperty.call(propertiesObject, prop))
                        result[prop] = propertiesObject[prop];
      return new result();
}

function keys(o: any): string[]
{
      const type = typeof o;
      if (o === null || type !== 'object' && type !== 'string') throw 'TypeError: Object.keys called on non-object';
      const result = [];
      if (type === 'string')
      {
            let i = -1;
            const len = o.length;
            while (++i < len) result.push(String(i));
            return result;
      }
      for (const prop in o) Object.prototype.hasOwnProperty.call(o, prop) && result.push(prop);
      return result;
}

//---------------------------------------
// Function
//---------------------------------------

function bind(src: Function, thisArg: any, ...args: any[]): any
{
      return function anonymity(this: Function, ..._args: any[])
      {
            const allArgs = args.concat(_args);
            if (this instanceof anonymity) return new (src as any)(...allArgs);
            return src.apply(thisArg, allArgs);
      };
}

//---------------------------------------
// String
//---------------------------------------

function trim(src: string): string
{
      return src.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

export { forEach, map, filter, reduce, create, keys, bind, trim };
