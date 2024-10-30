import { padStart } from '../lib/es8';

function stringToHex(str: string): string
{
      const { length } = str;
      const r = Array(length);
      let i = -1;
      while (++i < length) r[i] = padStart(str.charCodeAt(i).toString(16), 2, '0');
      return r.join('');
}

export default stringToHex;
