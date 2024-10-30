import { random } from './base/const';
import { map } from './lib/es5';

function randomNumberArray(min: number, max: number): number[]
{
      const result = Array(random(min, max));
      return map(result, (num) => num + random(0, 999));
}

export default randomNumberArray;
