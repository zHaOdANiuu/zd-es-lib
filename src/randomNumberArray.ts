import { map } from './lib/es5';
import { random } from './global/const';

function randomNumberArray(min: number, max: number): number[]
{
      const result = new Array(random(min, max));
      return map(result, (num) => num + random(0, 999));
}

export default randomNumberArray;
