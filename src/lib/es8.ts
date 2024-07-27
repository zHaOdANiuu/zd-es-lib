//---------------------------------------
// ObjectConstructor
//---------------------------------------

import { repeat } from './es6';

function entries<T>(o: Record<string, T> | ArrayLike<T>): [string, T][]
{
      const result: [string, T][] = [];
      for (const k in o) Object.prototype.hasOwnProperty.call(o, k) && result.push([ k, (o as any)[k] ]);
      return result;
}

//----------------------------------------
// String
//----------------------------------------

function padStart(src: string, maxLength: number, fillString = ' '): string
{
      const pad = repeat(fillString, Math.ceil((maxLength - src.length) / fillString.length));
      return pad.substring(0, maxLength) + src;
}

function padEnd(src: string, maxLength: number, fillString = ' '): string
{
      const pad = repeat(fillString, Math.ceil((maxLength - src.length) / fillString.length));
      return src + pad.substring(0, maxLength);
}

export { entries, padStart, padEnd };
