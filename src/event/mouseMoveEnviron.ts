function mouseMoveEnviron<T extends _Control>(element: T, callback: (e: MouseEvent) => void)
{
      let leftClickStatus = false;
      element.addEventListener('mousedown', () => { leftClickStatus = false; });
      element.addEventListener('mousemove', (e) => { leftClickStatus && callback(e); });
      element.addEventListener('mouseup', () => { leftClickStatus = true; });
      element.addEventListener('mouseout', () => { leftClickStatus = false; });
}

export default mouseMoveEnviron;
