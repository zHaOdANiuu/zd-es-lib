import mouseMoveEnviron from './mouseMoveEnviron';

function mouseMoveElement<T extends _Control>(element: T, callback: (this: T, event: MouseEvent) => void)
{
      mouseMoveEnviron(element, function(e)
      {
            this.location.x += e.clientX - this.size[0] / 2;
            this.location.y += e.clientY - this.size[1] / 2;
            callback.call(this, e);
      });
}

export default mouseMoveElement;
