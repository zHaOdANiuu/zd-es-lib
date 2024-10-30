import { BASE_CHARACTERS } from '../base/const';

/** base的编码 */
function btoa(data: string): string
{
      if ((/[^\0-\xFF]/).test(data)) throw 'Invalid character in input string';
      return data.replace(/[\s\S]{1,3}/g, str =>
      {
            const length = [ 0, 2, 1 ][str.length % 3];
            const binaryShiftedRight = str.charCodeAt(0) << 16
                | (str.length > 1 ? str.charCodeAt(1) << 8 : 0)
                | (str.length > 2 ? str.charCodeAt(2) : 0);
            return [
                  BASE_CHARACTERS.charAt(binaryShiftedRight >>> 18),
                  BASE_CHARACTERS.charAt(binaryShiftedRight >>> 12 & 63),
                  length >= 2 ? '=' : BASE_CHARACTERS.charAt(binaryShiftedRight >>> 6 & 63),
                  length >= 1 ? '=' : BASE_CHARACTERS.charAt(binaryShiftedRight & 63)
            ].join('');
      });
}

export default btoa;
