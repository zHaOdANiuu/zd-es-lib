function findMinValue<T extends number>(array: T[]): T | undefined
{
      if (array.length === 0) throw 'The length of the array is less than 1';
      let i = array.length;
      let result = array[--i];
      while (--i) if (array[i] < result) result = array[i];
      return result;
}

export default findMinValue;
