function padArrayWithZeros(array: unknown[], targetLength: number)
{
      let { length } = array;
      while (length < targetLength)
      {
            ++length;
            array.push(0);
      }
}

export default padArrayWithZeros;
