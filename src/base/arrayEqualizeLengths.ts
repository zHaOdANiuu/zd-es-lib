import { map } from '../lib/es5';
import padArrayWithZeros from './padArrayWithZeros';

function arrayEqualizeLengths(...args: unknown[][])
{
      const maxLength = Math.max(...map(args, e => e.length));
      return map(args, e =>
      {
            e.length < maxLength && padArrayWithZeros(e, maxLength);
            return e;
      });
}

export default arrayEqualizeLengths;
