import radiansToDegrees from './radiansToDegrees'

/** 通过面的棱数和顶点所相交的面数,计算二面角角度 */
const dihedralAngle = (m: number, n: number) =>
  radiansToDegrees(2 * Math.asin(Math.cos(Math.PI / n) * (1 / Math.sin(Math.PI / m))))

export default dihedralAngle
