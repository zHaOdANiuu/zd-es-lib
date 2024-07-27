function binarySearch<T>(arr: T[], target: T)
{
      let left = 0;
      let right = arr.length - 1;

      while (left <= right)
      {
            const mid = Math.floor((left + right) / 2);
            const guess = arr[mid];
            if (guess === target) return mid;
            else if (guess < target) ++left;
            else --right;
      }

      return -1;
}

export default binarySearch;
