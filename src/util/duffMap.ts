import duffEach from './duffEach'

function duffMap<T, U>(items: T[], process: (value: T, index: number) => U): U[] {
  const r = new Array(items.length)
  duffEach(items, (item, index) => {
    r[index] = process(item, index)
  })
  return r
}

export default duffMap
