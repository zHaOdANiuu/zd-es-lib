import forOwn from '../base/forOwn';

//---------------------------------------
// ObjectConstructor
//---------------------------------------

/**
 * 获取对象所有属性的键值对数组
 * @param o 对象
 * @returns 属性的键值对数组
 * @example
 * alert(entries({ a: 1, b: 2, c: 3 })); // [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]
 */
function entries(o: object): [string, any][];
function entries<T>(o: Record<string, T> | ArrayLike<T>): [string, T][]
{
      const result: [string, T][] = [];
      forOwn(o, (v, k) =>
      {
            result.push([ k, v as T ]);
      });
      return result;
}

//----------------------------------------
// String
//----------------------------------------

function padStart(src: string, maxLength: number, fillString = ' '): string
{
      if (src.length >= maxLength) return src;
      return Array(maxLength - src.length).join(fillString) + src;
}

function padEnd(src: string, maxLength: number, fillString = ' '): string
{
      if (src.length >= maxLength) return src;
      return src + Array(maxLength - src.length).join(fillString);
}

export {
      entries,
      padStart,
      padEnd
};
