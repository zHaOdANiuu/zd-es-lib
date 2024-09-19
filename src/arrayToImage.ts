import { map } from './lib/es5';
import { padStart } from './lib/es8';

function arrayToImage(imgData: number[])
{
      return map(imgData, char =>
      {
            const hexCode = char.toString(16).toUpperCase();
            return String.fromCharCode(parseInt(padStart(parseInt('00'.substring(hexCode.length) + hexCode, 16).toString(2), 8, '0'), 2));
      }).join('');
}

export default arrayToImage;
