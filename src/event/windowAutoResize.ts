import duffDevice from '../duffDevice';

function windowAutoResize(element: Group | Panel, size: number[])
{
      const { margins, spacing } = element;
      const _margins = + margins;
      const numLineElement = Math.floor((element.window.size[0] - 97) / size[0]);
      duffDevice(element.children, (e, i) =>
      {
            e.location.x = i % numLineElement * size[0] + _margins;
            e.location.y = Math.floor(i / numLineElement) * size[1] + spacing;
      });
}

export default windowAutoResize;
