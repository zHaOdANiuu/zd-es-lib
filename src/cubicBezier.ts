/**
 * @param p1 开始点
 * @param p2 控制点1
 * @param p3 控制点2
 * @param p4 结束点
 */
function cubicBezier(t: number, p1: number[], p2: number[], p3: number[], p4: number[]): TwoDPoint
{
      const b1 = Math.pow(t, 3);
      const b2 = Math.pow(t, 2) * 3 * (1 - t);
      const b3 = Math.pow(1 - t, 2) * 3 * t;
      const b4 = Math.pow(1 - t, 3);
      return [
            p1[0] * b1 + p2[0] * b2 + p3[0] * b3 + p4[0] * b4,
            p1[1] * b1 + p2[1] * b2 + p3[1] * b3 + p4[1] * b4
      ];
}

export default cubicBezier;
