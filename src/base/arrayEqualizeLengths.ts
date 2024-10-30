import { map } from '../lib/es5';
import padArrayWithZeros from './padArrayWithZeros';

function arrayEqualizeLengths(a: unknown[][])
{
      const maxLength = Math.max.apply(null, map(a, e => e.length));
      return map(a, e =>
      {
            e.length < maxLength && padArrayWithZeros(e, maxLength);
            return e;
      });
}

export default arrayEqualizeLengths;
