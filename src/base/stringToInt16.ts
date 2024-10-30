function stringToInt16(str: string): number[]
{
      const { length } = str;
      const result = Array<number>(length / 2);
      let i = -1;
      let j = -1;
      while (++i < length) result[++j] = str.charCodeAt(i++) + (i < length ? str.charCodeAt(i++) : 0) << 8;
      return result;
}
