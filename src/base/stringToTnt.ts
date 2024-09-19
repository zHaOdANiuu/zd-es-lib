function stringToInt32(str: string)
{
      const { length } = str;
      const result = new Array<number>(Math.floor(length / 4));
      let i = -1;
      let j = -1;
      while (i < length)
      {
            result[++j] = str.charCodeAt(++i) +
        (str.charCodeAt(++i) << 8) +
        (str.charCodeAt(++i) << 16) +
        (str.charCodeAt(++i) << 24);
      }
      return result;
}

export default stringToInt32;
