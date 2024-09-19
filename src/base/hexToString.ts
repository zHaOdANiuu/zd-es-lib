import { HEX_CHARACTERS } from '../global/const';

function hexToString(str: string)
{
      const { length } = str;
      const result = new Array<string>(Math.floor(length / 2));
      if (length % 2 === 1) str += '0';
      let i = 0;
      let j = -1;
      while (i < length)
      {
            const id1 = HEX_CHARACTERS.indexOf(str.substr(i, 1));
            const id2 = HEX_CHARACTERS.indexOf(str.substr(i + 1, 1));
            if (id1 === -1 || id2 === -1) throw 'Hex is broken';
            result[++j] = String.fromCharCode(Math.floor(id1 << 4 | id2));
            i += 2;
      }
      return result.join('');
}

export default hexToString;
