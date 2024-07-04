import { map, reduce } from '../lib/es5';

const Vector =
{
      add(vecArr1: number[], vecArr2: number[])
      {
            return map(vecArr1, (vec, index) => vec + vecArr2[index] || 0);
      },
      sub(vecArr1: number[], vecArr2: number[])
      {
            return map(vecArr1, (vec, index) => vec - vecArr2[index] || 0);
      },
      mul(vecArr: number[], amount: number)
      {
            return map(vecArr, (vec) => vec * amount);
      },
      div(vecArr: number[], amount: number)
      {
            return map(vecArr, (vec) => vec / amount);
      },
      clamp(value: number, limit1: number, limit2: number)
      {
            return Math.min(Math.max(value, limit1), limit2);
      },
      dot(vecArr1: number[], vecArr2: number[])
      {
            return reduce(vecArr1, (acc, cur, index) => acc + cur * vecArr2[index], 0);
      },
      cross(vecArr1: number[], vecArr2: number[])
      {
            vecArr1[2] = vecArr1[2] || 0;
            vecArr2[2] = vecArr2[2] || 0;
            return [
                  vecArr1[1] * vecArr2[2] - vecArr1[2] * vecArr2[1],
                  vecArr1[2] * vecArr2[0] - vecArr1[0] * vecArr2[2],
                  vecArr1[0] * vecArr2[1] - vecArr1[1] * vecArr2[0]
            ];
      },
      normalize(vecArr: number[])
      {
            return this.div(vecArr, this.length(vecArr));
      },
      length(vec1: number[], vec2 = [ 0, 0 ]): number
      {
            const xDiff = vec1[0] - vec2[0];
            const yDiff = vec1[1] - vec2[1];
            return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
      },
      lookAt(fromPoint: number[], atPoint: number[])
      {
            const z = this.normalize(this.sub(atPoint, fromPoint));
            const x = this.normalize(this.cross([ 0, 1, 0 ], z));
            const y = this.cross(z, x);
            return [ x, y, z ];
      }
};

export default Vector;
