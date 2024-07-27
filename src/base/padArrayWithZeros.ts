function padArrayWithZeros(array: unknown[], targetLength: number)
{
      let len = array.length;
      while (len < targetLength)
      {
            ++len;
            array.push(0);
      }
}

export default padArrayWithZeros;
