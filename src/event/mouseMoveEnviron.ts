function mouseMoveEnviron<T extends _Control>(element: T, moveCallback: MouseEventCallback<T>, downCallback?: MouseEventCallback<T>, upCallback?: MouseEventCallback<T>)
{
      let leftClickStatus = false;
      element.addEventListener('mousedown', function(this: T, e: MouseEvent)
      {
            leftClickStatus = true;
            downCallback && downCallback.call(this, e);
      });
      element.addEventListener('mousemove', function(this: T, e: MouseEvent)
      {
            leftClickStatus && moveCallback.call(this, e);
      });
      element.addEventListener('mouseup', function(this: T, e: MouseEvent)
      {
            leftClickStatus = false;
            upCallback && upCallback.call(this, e);
      });
      element.addEventListener('mouseout', () => { leftClickStatus = false; });
}

export default mouseMoveEnviron;
