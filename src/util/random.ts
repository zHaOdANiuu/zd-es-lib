import { isUndefined } from './is'

const random = (() =>
{
      const fn = isUndefined(generateRandomNumber) ? Math.random : generateRandomNumber
      return (min?: number, max?: number) =>
      {
            if (isUndefined(min)) min = 0
            if (isUndefined(max)) max = 1
            return fn() * (max - min) + min | 0
      }
})()

export default random
