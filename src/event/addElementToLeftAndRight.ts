function addElementToLeftAndRight<T extends ElementType>(
      type: ElementType,
      num: number,
      size: number[],
      container: Window,
      callback: (e: ElementMap[T], i: number) => void
)
{
      let i = -1;
      while (++i < num)
      {
            const e = container.add(type as any);
            e.bounds = i % 2 === 0
                  ? [
                        0,
                        i / 2 * size[1],
                        size[0] + 1,
                        size[1] + i / 2 * size[1] + 1
                  ]
                  : [
                        size[0],
                        (i - 1) * size[1] / 2,
                        size[0] * 2,
                        (i + 1) * size[1] / 2 + 1
                  ];
            callback(e, i);
      }
      container.bounds = [ 0, 0, size[0] * 2, size[1] * num / 2 + 1 ];
}

export default addElementToLeftAndRight;
