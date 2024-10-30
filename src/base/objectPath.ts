/**
 * Get a value from an object using a path string.
 * @param object - The object to get the value from.
 * @param oath - The path string to use.
 * @param delimiter - The delimiter to use for splitting the path string.
 * @returns The value at the end of the path.
 * @example
 * objectPath({ a: { b: { c: 1 } } }, 'a/b/c', '/'); // 1
 */
function objectPath(object: Record<string, any>, oath: string, delimiter: RegExp | string)
{
      let next = object;
      let i = -1;
      const split = oath.split(delimiter);
      const { length } = split;
      while (++i < length) next = next[split[i]];
      return next;
}

export default objectPath;
