import duffEach from '../util/duffEach'

const cross = (o: TwoDPoint, a: TwoDPoint, b: TwoDPoint) =>
  (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

function convexHull(points: TwoDPoint[]) {
  points.sort((a, b) => a[0] - b[0] || a[1] - b[1])
  const lower: TwoDPoint[] = []
  duffEach(points, p => {
    while (lower.length > 1 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0)
      lower.pop()
    lower.push(p)
  })
  const upper = []
  let p: TwoDPoint | undefined
  while ((p = points.pop())) {
    while (upper.length > 1 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0)
      upper.pop()
    upper.push(p)
  }
  upper.pop()
  return lower.concat(upper)
}

export default convexHull
