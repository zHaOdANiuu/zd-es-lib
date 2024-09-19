import { BASE_CHARACTERS_TAB } from './const';

function atob(data: string): string
{
      return data.replace(/[^A-Za-z0-9+/]/g, '').replace(/\S{1,4}/g, str =>
      {
            const length = str.length;
            const binaryShiftedRight = (length > 0 ? BASE_CHARACTERS_TAB[str.charAt(0)] << 18 : 0)
                  | (length > 1 ? BASE_CHARACTERS_TAB[str.charAt(1)] << 12 : 0)
                  | (length > 2 ? BASE_CHARACTERS_TAB[str.charAt(2)] << 6 : 0)
                  | (length > 3 ? BASE_CHARACTERS_TAB[str.charAt(3)] : 0);
            const chars = [
                  String.fromCharCode(binaryShiftedRight >>> 16),
                  String.fromCharCode(binaryShiftedRight >>> 8 & 0xff),
                  String.fromCharCode(binaryShiftedRight & 0xff)
            ];
            chars.length -= [ 0, 0, 2, 1 ][length % 4];
            return chars.join('');
      });
}

export default atob;
