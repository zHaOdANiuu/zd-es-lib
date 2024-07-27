function addButtonToLeftAndRight(
      num: number,
      size: [number, number],
      container: Window,
      callback: (button: Button, index: number) => void
)
{
      let i = -1;
      while (++i < num)
      {
            const button = container.add('button');
            button.bounds = i % 2 === 0
                  ? [
                        0,
                        i / 2 * size[1],
                        size[0],
                        size[1] + i / 2 * size[1]
                  ]
                  : [
                        size[0],
                        (i - 1) * size[1] / 2,
                        size[0] * 2,
                        (i + 1) * size[1] / 2
                  ];
            callback(button, i);
      }
      container.bounds = [ 0, 0, size[0] * 2, size[1] * num / 2 ];
}

export default addButtonToLeftAndRight;
