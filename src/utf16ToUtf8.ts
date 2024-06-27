function UTF16ToUTF8(string: string)
{
      const codeUnits = [];
      for (let index = 0; index < string.length; index += 2)
            codeUnits.push(parseInt(string.substring(index, index + 2), 16));
      let result = '';
      for (let i = -1, l = codeUnits.length; ++i < l;)
      {
            const codeUnit = codeUnits[i];
            const binary = codeUnit.toString(2);
            const exec = (/^1*?(?=0)/).exec(binary);
            if (!(binary.length === 8 && exec))
            {
                  result += String.fromCharCode(codeUnit);
                  continue;
            }
            const ll = exec[0].length;
            let newData = binary.substring(7 - ll);
            for (let ii = 0; ++ii < ll;) newData += codeUnits[i + ii].toString(2).substring(2);
            i += ll - 1;
            result += String.fromCharCode(parseInt(newData, 2));
      }
      return result;
}

export default UTF16ToUTF8;
