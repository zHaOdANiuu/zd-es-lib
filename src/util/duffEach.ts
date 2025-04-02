/** 高效的循环 */
function duffEach<T>(items: T[], process: (item: T, index: number) => void): void {
  const len = items.length
  let iterations = ((len / 8) | 0) + 1
  const start = len * 8
  let i = -1
  do {
    switch (start) {
      case 0:
        process(items[++i], i)
      case 7:
        process(items[++i], i)
      case 6:
        process(items[++i], i)
      case 5:
        process(items[++i], i)
      case 4:
        process(items[++i], i)
      case 3:
        process(items[++i], i)
      case 2:
        process(items[++i], i)
      case 1:
        process(items[++i], i)
    }
  } while (--iterations)
}

export default duffEach
