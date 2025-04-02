function stringToInt8(str: string): number[]
{
      const { length } = str
      const result = Array(length)
      let i = -1
      while (++i < length) result[i] = str.charCodeAt(i)
      return result
}

export default stringToInt8
