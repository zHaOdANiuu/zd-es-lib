import { map } from '../lib/es5';

function intToString(array: number[])
{
      return map(array, e => String.fromCharCode(
            e & 255,
            e >>> 8 & 255,
            e >>> 16 & 255,
            e >>> 24 & 255
      )).join('').replace(/\0/g, '');
}

export default intToString;
