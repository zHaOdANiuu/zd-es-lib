import duffEach from '../util/duffEach'

function getBounds(values: TwoDPoint[]) {
  const mins: number[] = []
  const maxs: number[] = []
  duffEach(values, v => {
    duffEach(v, (v2, i) => {
      if (!mins[i]) mins[i] = v2
      else if (v2 < mins[i]) mins[i] = v2
      if (!maxs[i]) maxs[i] = v2
      else if (v2 > maxs[i]) maxs[i] = v2
    })
  })
  return mins.concat(maxs)
}

export default getBounds
