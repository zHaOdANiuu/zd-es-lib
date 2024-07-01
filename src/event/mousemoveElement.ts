function mousemoveElement(element: _Control, callback: (this: _Control, event?: MouseEvent) => void)
{
      let leftClickStatus = false;
      const fn = function(event: MouseEvent)
      {
            if (event.type === 'mouseup') leftClickStatus = false;
            else if (event.type === 'mousemove') { if (leftClickStatus === false) return; }
            else if (event.type === 'mousedown') leftClickStatus = true;
            element.location = [
                  event.clientX + (element.location[0] - element.size[0] / 2),
                  event.clientY + (element.location[1] - element.size[1] / 2)
            ] as Point;
            callback.call(element, event);
      };
      element.addEventListener('mouseup', fn);
      element.addEventListener('mousemove', fn);
      element.addEventListener('mousedown', fn);
}

export default mousemoveElement;
