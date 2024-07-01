//-----------------------------------------------------------------------------
// 常用的常数
//-----------------------------------------------------------------------------

export const undef = void 0;

export const BASE_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

export const BASE_CHARACTERS_TAB: Record<string, number> = {
      'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7,
      'I': 8, 'J': 9, 'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15,
      'Q': 16, 'R': 17, 'S': 18, 'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23,
      'Y': 24, 'Z': 25, 'a': 26, 'b': 27, 'c': 28, 'd': 29, 'e': 30, 'f': 31,
      'g': 32, 'h': 33, 'i': 34, 'j': 35, 'k': 36, 'l': 37, 'm': 38, 'n': 39,
      'o': 40, 'p': 41, 'q': 42, 'r': 43, 's': 44, 't': 45, 'u': 46, 'v': 47,
      'w': 48, 'x': 49, 'y': 50, 'z': 51, '0': 52, '1': 53, '2': 54, '3': 55,
      '4': 56, '5': 57, '6': 58, '7': 59, '8': 60, '9': 61, '+': 62, '/': 63,
      '=': 64
};

export const AE_MENU_COMMAND_ID = {
      Next: {
            NewText:             2836,
            NewSolid:            2038,
            NewLight:            2563,
            NewCamera:           2564,
            NewNullObject:       2767,
            NewShapeLayer:       3736,
            NewAdjustmentLayer:  2279,
            SaveAnimationPreset: 3075
      }
};

export const FILE_SUFFIX = {
      XML:        /\.xml$/,
      PNG:        /\.png$/,
      JPEG:       /\.jpg|jpeg$/,
      JSON:       /\.json$/,
      JavaScript: /\.js|jsx|jsxbin$/
};

export const FILE_WILDCARD = {
      MD:         'zd:*.md,',
      LRC:        'zd:*.lrc,',
      TXT:        'zd:*.txt,',
      MP3:        'zd:*.mp3,',
      PNG:        'zd:*.png,',
      JPEG:       'zd:*.jpg,zd:*.jpeg,',
      XML:        'zd:*.xml,',
      JSON:       'zd:*.json,',
      JavaScript: 'zd:*.js,zd:*.jsx,zd:*.jsxbin,'
};

export const MIN_IMAGE = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x01\x03\x00\x00\x00\x01\x18\x07\t\x00\x00\x00\x03PLTE\x00\x00\x00?\x1A\x07\n\x00\x00\x00\x0BIDAT\b';

//-----------------------------------------------------------------------------
// 一些简短的函数
//-----------------------------------------------------------------------------

export const isEmptyArray = (arr: unknown[]) => Boolean(arr.toString()) === false;

export const isEmptyObject = (object: object) =>
{
      for (const _ in object) return false; return true;
};

export const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const removeQuotes = (str: string) => str.replace(/['"]+/g, '');

export const removeSpaces = (str: string) => str.replace(/\s+/g, '');

export const removeComments = (str: string) => str.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1');

export const compressCode = (str: string) => removeSpaces(removeComments(str));

export const reversedString: (str: string) => string = (str: string) => str.split('').reverse().join('');

export const randomString = () => Number(generateRandomNumber().toString().substring(2)).toString(16);

export const random = (min = 0, max = 1) => Math.floor(generateRandomNumber() * (max - min) + min);

export const rgbNormalize = (rgb: number[]) => [ rgb[0] / 255, rgb[1] / 255, rgb[2] / 255 ];

export const hsbNormalize = (hsb: number[]) => [ hsb[0] / 360, hsb[1] / 100, hsb[2] / 100 ];

export const rgbToHex = (rgb: number[]) => '#' + ((rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16);

export const hexToRgb = (hex: string) =>
{
      const result = (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i).exec(hex);
      return result ? [ parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16) ] : null;
};

export const randomHexColor = () => rgbToHex([ random(0, 255), random(0, 255), random(0, 255) ]);

export const degreesToRadians = (degrees: number) => degrees * Math.PI / 180;

export const radiansToDegrees = (radians: number) => radians / Math.PI * 180;

export const dihedralAngle = (m: number, n: number) => radiansToDegrees(2 * Math.asin(Math.cos(Math.PI / n) * (1 / Math.sin(Math.PI / m))));

export const iterateeCode = (iterations: number, code: string) =>
{
      Function.call({}, new Array(1 + iterations).join(';' + code))();
};

export const swapValue = (a: unknown, b: unknown) =>
{
      if (a === null || b === null || a === undef || b === undef) throw 'Cannot assign value';
      a = [ b, b = a ][0];
};
