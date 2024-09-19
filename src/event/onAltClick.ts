function onAltClick<T extends _Control>(element: T, callback: (this: T, event: MouseEvent) => void)
{
      element.addEventListener('click', e =>
      {
            e.altKey === true
            && e.button === 0
            && e.detail === 1
            && callback.call(element, e);
      });
}

export default onAltClick;
