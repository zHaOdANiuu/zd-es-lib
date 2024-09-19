import duffDevice from '../duffDevice';

function windowAutoResize(container: Group | Panel, childSize: number[])
{
      const { margins, spacing } = container;
      const numLineElement = Math.floor(container.window.size[0] / childSize[0]);
      duffDevice(container.children, (e, i) =>
      {
            e.location.x = i % numLineElement * childSize[0] + spacing;
            e.location.y = Math.floor(i / numLineElement) * childSize[1] + +margins;
      });
}

export default windowAutoResize;
