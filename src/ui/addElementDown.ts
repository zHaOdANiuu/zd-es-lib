function addElementDown(
  type: ElementType,
  num: number,
  size: number[],
  container: Window,
  callback: (e: ElementMap[ElementType], i: number) => void
) {
  let i = -1
  while (++i < num) {
    const e = container.add(type as any)
    e.bounds = [0, i * size[1], size[0], (i + 1) * size[1] + 1]
    callback(e, i)
  }
  container.bounds = [0, 0, size[0], size[1] * num + 1]
}

export default addElementDown
