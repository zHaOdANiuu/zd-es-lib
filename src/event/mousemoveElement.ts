import mouseMoveEnviron from './mouseMoveEnviron';

function mouseMoveElement(element: _Control, callback: () => void)
{
      mouseMoveEnviron(element, e =>
      {
            element.location.x += e.clientX - element.size[0] / 2;
            element.location.y += e.clientY - element.size[1] / 2;
            callback();
      });
}

export default mouseMoveElement;
