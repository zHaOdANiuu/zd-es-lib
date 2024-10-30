import { map } from './lib/es5';
import { padStart } from './lib/es8';

/** 把十进制的数组数据转图片 */
function arrayToImage(imgData: number[])
{
      return map(imgData, str =>
      {
            const hexCode = str.toString(16).toUpperCase();
            return String.fromCharCode(parseInt(padStart(parseInt('00'.substring(hexCode.length) + hexCode, 16).toString(2), 8, '0'), 2));
      }).join('');
}

export default arrayToImage;
