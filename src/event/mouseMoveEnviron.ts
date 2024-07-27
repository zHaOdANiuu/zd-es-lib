function mouseMoveEnviron<T extends _Control>(element: T, callback: (this: T, e: MouseEvent) => void)
{
      let leftClickStatus = false;
      element.addEventListener('mousedown', () => { leftClickStatus = true; });
      element.addEventListener('mousemove', (e) => { leftClickStatus && callback.call(element, e); });
      element.addEventListener('mouseup', () => { leftClickStatus = false; });
      element.addEventListener('mouseout', () => { leftClickStatus = false; });
}

export default mouseMoveEnviron;
