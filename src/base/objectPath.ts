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
